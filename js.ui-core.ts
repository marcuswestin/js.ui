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

export let makeElement = (tagName: string, ...args: UIArgs): UIElement => {
    return makeElement_(tagName, ...args)
}

export function Key(key: string): UIKey {
    return new UIKey(key)
}

type UIArg = any
type UIArgs = UIArg[]
type UIProperty = any
type UIProperties = {[ key: string ]: UIProperty }
type UIElement = ReactElement | string | number | boolean  | symbol
type UIChildren = UIElement[]

// --- Internal ----------------------------------------------------
////////////////////////////////////////////////////////////////////

class UIKey {
    readonly key: string
    constructor(key: string) { this.key = key }
}

// UI Element consctruction
///////////////////////////

function makeElement_(tagName: string, ...args: UIArgs): UIElement {

    var props: UIProperties = {}
    var children: UIChildren = []

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

function processArgsIntoPropsAndChildren(args: UIArgs, props: UIProperties, children: UIArgs) {
    for (let i=0; i<args.length; i++) {
        let arg = args[i]

        if (React.isValidElement(arg)) {
            children.push(arg)

        } else if (arg instanceof UIKey) {
            props['key'] = arg.key

        } else if (isScalar(arg)) {
            children.push(arg)

        } else if (Array.isArray(arg)) {
            processArgsIntoPropsAndChildren(arg, props, children)

        } else if (isFunction(arg)) {
            processArgsIntoPropsAndChildren(arg(), props, children)

        } else if (typeof arg === 'object') {
            processPropsArg(arg, props)
        
        } else {
            let error = new Error('Unexpected properties argument')
            console.error(error, arg)
            throw error
        }
    }
}

function processPropsArg(arg: UIArg, props: UIProperties): void {
    for (const name in arg) {

        if (name === 'style') {
            // Allow for multiple style declaration arguments per UI element
            processStyleArg(arg, props)
            continue
        }

        if (props[name] !== undefined) {
            throw new Error(`Property key declared twice: ${name}`)
        }

        props[name] = arg[name]
    }
}

function processStyleArg(arg: UIArg, props: UIProperties): void {
    if (props.style) {
        props.style = {...props.style, ...arg.style}
    } else {
        props.style = arg.style
    }
}


// Flag-Enabled functionality
/////////////////////////////

function enableDebugBackgrounds(props: UIProperties) {
    if (props.style == null) {
        props.style = {}
    }
    if (props.style.background == null) {
        let randRBG = () => Math.random() * 255
        let colors = [randRBG(), randRBG(), randRBG(), 0.2]
        props.style.background = `rgba(${colors.join(',')})`
    }
}

function enableAutoKeysForChildren(children: UIChildren) {
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


// Utils
////////

function isFunction(functionToCheck: UIArg): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

var withSymbol = typeof Symbol !== 'undefined';
function isScalar(value: UIArg): boolean {
    var type = typeof (value)
    if (type === 'string') return true
    if (type === 'number') return true
    if (type === 'boolean') return true
    if (withSymbol === true && type === 'symbol') return true

    // null & undefined are considered to be scalar too
    if (value == null) return true
    if (withSymbol === true && value instanceof Symbol) return true
    if (value instanceof String) return true
    if (value instanceof Number) return true
    if (value instanceof Boolean) return true

    return false
}
