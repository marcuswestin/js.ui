// js.ui - core

// js.ui provides an idiomatic approach to creating UI code in vanilla JS.
// It is designed to address a set of specific shortcomings of JSX.
// Notably, JSX falls short on two fronts:
//   - The parameters API
//       - Klunky and difficult to specify types
//       - inabikity to pass on props wholesapce
//       - does not fit neatly with typescript's types
//   - Conditional rendering
//       - it inevitably ends up leading to errors
//       - TOD
// It does however handle some things that we need to manually account for
//   - Keys
//      - without JSX, we need to manually name every element in the UI tree
//      - JSX resolves this by auto-generating an incrementing number as key for every
//          child element that has no key
//

import React, { ReactElement } from 'react'

export let flags = {
    ENABLE_DEBUG_BACKGROUNDS: true,
    ENABLE_AUTO_KEYS: true,
}

export let makeElement = (tagName: string, ...args: Argument[]): Element => {
    return makeElement_(tagName, ...args)
}

export function Key(key: string): ElementKey {
    return new ElementKey(key)
}

class ElementKey {
    readonly key: string
    constructor(key: string) { this.key = key }
}

export type Argument = Element | Properties | ElementKey | null
type Element = ReactElement | LabelElement
type ElementChild = ReactElement | string
type PropertyValue = any
type Properties = {[ key: string ]: PropertyValue }

// --- Internal ----------------------------------------------------
////////////////////////////////////////////////////////////////////

interface Stringable {
    toString(): string
}

class LabelElement {
    readonly value: string
    constructor(value: Stringable) { this.value = value.toString() }
}

type UITextArgument = string | number | undefined | null

export function Label(text: UITextArgument): LabelElement {
    return new LabelElement(text ? text.toString() : '')
}

// UI Element consctruction
///////////////////////////

function makeElement_(tagName: string, ...args: Argument[]): Element {

    var props: Properties = {}
    var children: ElementChild[] = []

    processArgsIntoPropsAndChildren(args, props, children)

    if (props.key) {
        // make explicitly set keys visible in the DOM tree
        props['ui-key'] = props.key
    }

    if (!tagName) {
        // without the dash, React complains about the name casing
        tagName = props.key+'-'
    }

    if (flags.ENABLE_DEBUG_BACKGROUNDS) {
        enableDebugBackgrounds(props)
    }
    if (flags.ENABLE_AUTO_KEYS) {
        enableAutoKeysForChildren(children)
    }
    
    return React.createElement(tagName, props,
        children.length === 0
        ? null // React complains if "void" tags (eg input) have non-null children (even an empty array)
        : children.length === 1
        ? children[0] // TODO: is this helpful at all?
        : children
    )
}

// Process arguments
////////////////////

function processArgsIntoPropsAndChildren(args: Argument[], props: Properties, children: ElementChild[]) {
    for (let i=0; i<args.length; i++) {
        let arg = args[i]

        if (React.isValidElement(arg)) {
            children.push(arg)

        } else if (arg instanceof LabelElement) {
            children.push(arg.value)

        } else if (arg instanceof ElementKey) {
            props['key'] = arg.key

        } else if (Array.isArray(arg)) {
            processArgsIntoPropsAndChildren(arg as Argument[], props, children)

        } else if (arg?.__getStyles) {
            processStyleArg(arg?.__getStyles(), props)

        // } else if (isFunction(arg)) {
        //     processArgsIntoPropsAndChildren(arg(), props, children)

        } else if (typeof arg === 'object') {
            let propsArg = arg as Properties
            processPropsArg(propsArg, props)
        
        } else {
            let errorMessage = 'Unexpected properties argument'
            console.error(errorMessage, args, i, arg)
            throw new Error(errorMessage)
        }
    }
}

function processPropsArg(propsArg: PropertyValue, props: Properties): void {
    for (const name in propsArg) {

        if (name === 'style') {
            // Allow for multiple style declaration arguments per UI element
            processStyleArg(propsArg.style, props)
            continue
        }

        if (props[name] !== undefined) {
            throw new Error(`Property key declared twice: ${name}`)
        }

        props[name] = propsArg[name]
    }
}

function processStyleArg(styleArg: any, props: Properties): void {
    if (!styleArg) { return }
    if (props.style) {
        props.style = {...props.style, ...styleArg}
    } else {
        props.style = styleArg
    }
}


// Flag-Enabled functionality
/////////////////////////////

function enableDebugBackgrounds(props: Properties) {
    if (props.style == null) {
        props.style = {}
    }
    if (props.style.background == null) {
        let randRBG = () => Math.random() * 255
        let colors = [randRBG(), randRBG(), randRBG(), 0.75]
        props.style.background = `rgba(${colors.join(',')})`
    }
}

function enableAutoKeysForChildren(children: ElementChild[]) {
    if (children.length <= 0) {
        return
    }
    for (var i=0; i<children.length; i++) {
        if (!React.isValidElement(children[i])) {
            continue
        }
        let child = children[i] as ReactElement
        if (child.key) {
            continue
        }
        let key = `${i}`
        children[i] = React.cloneElement(child, { key:key, 'ui-auto-key': key })
    }
}
