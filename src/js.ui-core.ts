import React from "react"
import { View, ViewArg, UniversalViewProperties, ReactElement } from "./js.ui-types"

let flags = {
    ENABLE_AUTO_CHILD_KEYS: true
}

export let viewMakers: ViewMakers

export type TextViewMaker = (properties: any, text: string) => View
export type ViewMaker = (properties: any, children: View[]) => View
export type ViewEngine = 'Native' | 'DOM'
type ViewMakers = {
    engine: ViewEngine,
    makeView: ViewMaker,
    makeTextView: TextViewMaker,
    // TODO: makeImageView
}

// setViewMakers is for internal use only.
// It allows for the DOM and Native view engines to set the view maker functions,
// which in turn get called by e.g the universal engine in order to create views.
export function setViewMakers(theViewMakers: ViewMakers) {
    viewMakers = theViewMakers
}

// makeView is for internal use only.
// It takes a list of view arguments, and processes them into a view with the
// given properties. Each view argument can be a properties object, a child view, a
// list of additional view arguments to unwrap (which allows for e.g a view property
// function to add multiple children, properties, etc), or null/undefined. It will
// also apply optional properties, such as automatically settings keys for all child
// views.
export function makeView(...viewArgs: any[]): View {
    let viewProperties: UniversalViewProperties = {}
    let viewChildren: View[] | null = []

    processArgsIntoPropsAndChildren(viewProperties, viewChildren, viewArgs)

//TODO
    // if (viewProperties.key) {
    //     // make explicitly set keys visible in the DOM tree
    //     viewProperties['ui-key'] = viewProperties.key
    // }

//TODO
    // if (!type) {
    //     // without the dash, React complains about the name casing
    //     type = viewProperties.key+'-'
    // }

//TODO
    // if (flags.ENABLE_DEBUG_BACKGROUNDS) {
    //     enableDebugBackgrounds(viewProperties)
    // }

    if (flags.ENABLE_AUTO_CHILD_KEYS) {
        enableAutoKeysForChildren(viewChildren)
    }
    
    // viewChildren = (viewChildren.length === 0
    //     ? null // React complains if "void" tags (eg input) have non-null viewChildren (even an empty array)
    //     : viewChildren)

    return viewMakers.makeView(viewProperties, viewChildren)
}

function enableAutoKeysForChildren(children: View[]) {
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

// processArgsIntoPropsAndChildren takes a takes a list of view arguments to process,
// and populates the given set of view properties and children.
// React elements are treated as child views.
// Objects are treated as view properties.
// And Arrays are unwrapped and recursively processed.
function processArgsIntoPropsAndChildren(viewProperties: UniversalViewProperties, viewChildren: View[], viewArgsToProcess: ViewArg[]) {
    for (let viewArg of viewArgsToProcess) {
        if (!viewArg) {
            continue

        } else if (React.isValidElement(viewArg)) {
            viewChildren.push(viewArg)

        } else if (Array.isArray(viewArg)) {
            processArgsIntoPropsAndChildren(viewProperties, viewChildren, viewArg)

        } else if (typeof viewArg === 'object') {
            let propsArg = viewArg as UniversalViewProperties
            mergeInViewProperties(viewProperties, propsArg)
        
        } else {
            let errorMessage = 'Unexpected properties argument'
            console.error(errorMessage, viewArg, viewArgsToProcess)
            throw new Error(errorMessage)
        }
    }
}

// mergeInViewProperties takes the view properties processed so far, and the propsArg
// to merge in. It allows for *multiple* style properties, and will merge them together
// into one. All other properties must be declared no more than once.
function mergeInViewProperties(viewProperties: UniversalViewProperties, propsArg: UniversalViewProperties): void {
    for (const name in propsArg) {

        if (name === 'style') {
            // Allow for multiple style declaration arguments per UI view element
            // by merging together all its style declarations into one
            viewProperties.style = {...viewProperties.style, ...propsArg.style}
        
        } else if (viewProperties[name] !== undefined) {
            // Non-style properties must not be declared more than once
            throw new Error(`Property key declared twice: ${name}`)
        
        } else {
            viewProperties[name] = propsArg[name]
        }
    }
}
