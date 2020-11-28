import React from "react";
import { TextStyles, ViewProperties, ViewStyles } from "./js.ui-types";
import { ReactElement } from "./types/react-types";
import flags from './flags'

type View = ReactElement
export type ChildView = View | TextViewElement
type ViewArg = ViewStyleArg | ChildView | ChildView[] // | ViewProperties
export function Row(...args: ViewArg[]): View {
    let styles = Style({ display: 'flex', flexDirection: 'row' })
    return makeElement(styles, ...args)
}
export function Col(...args: ViewArg[]): View {
    let styles = Style({ display: 'flex', flexDirection: 'column' })
    return makeElement(styles, ...args)
}

type ViewStyleArg = { style:ViewStyles, __JSUIViewStyles:true }
export function Style(styles: ViewStyles): ViewStyleArg {
    return { style:styles, __JSUIViewStyles:true }
}

type TextStyleArg = { style:TextStyles, __JSUITextStyles:true }
export function TextStyle(styles: TextStyles): TextStyleArg {
    return { style:styles, __JSUITextStyles:true }
}

let viewMakers: ViewMakers = createViewMakers()

export function makeElement(...args: ViewArg[]): View {

    let props: ViewProperties = {}
    let children: ChildView[] | null = []

    processArgsIntoPropsAndChildren(args, props, children)

//TODO
    // if (props.key) {
    //     // make explicitly set keys visible in the DOM tree
    //     props['ui-key'] = props.key
    // }

//TODO
    // if (!type) {
    //     // without the dash, React complains about the name casing
    //     type = props.key+'-'
    // }

//TODO
    // if (flags.ENABLE_DEBUG_BACKGROUNDS) {
    //     enableDebugBackgrounds(props)
    // }

    if (flags.ENABLE_AUTO_CHILD_KEYS) {
        enableAutoKeysForChildren(children)
    }
    
    // children = (children.length === 0
    //     ? null // React complains if "void" tags (eg input) have non-null children (even an empty array)
    //     : children)


    return viewMakers.makeView(props, children)
}

function enableAutoKeysForChildren(children: ChildView[]) {
    for (var i=0; i<children.length; i++) {
        if (!React.isValidElement(children[i])) {
            continue
        }
        let child = children[i] as ReactElement
        if (child.key) {
            continue
        }
        let key = `${i}`
        children[i] = React.cloneElement(child, { key:key })
    }
}




/// TEXT VIEWS
//////////////

function isTextStyleArg(arg: TextViewArg): arg is TextStyleArg {
    return '__JSUITextStyles' in (arg as any)
}
function isViewStyleArg(arg: ViewArg): arg is ViewStyleArg {
    return '__JSUIViewStyles' in (arg as any)
}
function isTextViewElement(arg: ViewArg): arg is TextViewElement {
    return arg instanceof TextViewElement
}


// interface Stringable { toString(): string }
type ScalarTextValue = string | number | undefined
type TextViewArg = ScalarTextValue | TextStyleArg // | TextProperties
export function TextView(...args: TextViewArg[]): ChildView {
    let values: string[] = []
//TODO
    // let properties: TextProperties | undefined = undefined
    let styles: TextStyles = {}
    for (let arg of args) {
        if (!arg) {
            continue
        }
        if (typeof arg === 'string') {
            values.push(arg)

        } else if (typeof arg === 'number') {
            values.push(arg.toString())

        } else if (isTextStyleArg(arg)) {
            styles = Object.assign(styles, arg.style)

        // } else {
        //     properties = Object.assign(properties || {}, arg)
        
        } else {
            throw new Error()
        }
    }
    return new TextViewElement(values.join(' '), styles)
}


export class TextViewElement {
    constructor(
        readonly value: string,
//TODO    
        // readonly properties?: TextProperties,
        readonly styles?: TextStyles,
    ) {}
}




// Process arguments
////////////////////

function processArgsIntoPropsAndChildren(args: ViewArg[], props: ViewProperties, children: ChildView[]) {
    for (let i=0; i<args.length; i++) {
        let arg = args[i]
        if (!arg) { continue }

        if (React.isValidElement(arg)) {
            children.push(arg)

        } else if (isTextViewElement(arg)) {
            children.push(viewMakers.makeTextView(arg))

//TODO
        // } else if (arg instanceof ElementKey) {
        //     props['key'] = arg.key

        } else if (Array.isArray(arg)) {
            processArgsIntoPropsAndChildren(arg, props, children)

        } else if (isViewStyleArg(arg)) {
            processStyleArg(arg, props)

        } else if (typeof arg === 'object') {
            let propsArg = arg as ViewProperties
            processViewPropsArg(propsArg, props)
        
        } else {
            let errorMessage = 'Unexpected properties argument'
            console.error(errorMessage, args, i, arg)
            throw new Error(errorMessage)
        }
    }
}

function processViewPropsArg(propsArg: ViewProperties, props: ViewProperties): void {
    for (const name in propsArg) {

        if (name === 'style') {
            // Allow for multiple style declaration arguments per UI element
            processStyleArg(propsArg.style, props)
            continue
        }

        // @ts-ignore
        if (props[name] !== undefined) {
            throw new Error(`Property key declared twice: ${name}`)
        }

        // @ts-ignore
        props[name] = propsArg[name]
    }
}

function processStyleArg(styleArg: ViewStyleArg, props: ViewProperties): void {
    if (!styleArg) { return }
    if (props.style) {
        props.style = {...props.style, ...styleArg.style}
    } else {
        props.style = styleArg.style
    }
}


/// VIEW MAKERS
///////////////

type TextViewMaker = (textViewElement: TextViewElement) => View
type ViewMaker = (styles: ViewStyles, children: ChildView[]) => View
type ViewMakers = { makeView: ViewMaker, makeTextView: TextViewMaker }
function createViewMakers(): ViewMakers {
    let types: { view:any, text:any }
    try {
        let ReactNative = require('react-native')
        types = {
            view: ReactNative.View,
            text: ReactNative.Text,
        }   
    } catch (ex) {
        try {
            require('react-dom')
            types = {
                view: 'div',
                text: 'span',
            }    
        } catch (ex) {
            throw new Error("Unable to require either react-native or react-dom")
        }
    }
    
    return {
        makeView: (properties: ViewProperties, children: ChildView[]) => {
            return React.createElement(types.view, properties, children)
        },
        makeTextView: (textViewElement: TextViewElement) => {
            let props = { style:textViewElement.styles }
            return React.createElement(types.text, props as any, textViewElement.value)            
        }
    }    
}