import React from 'react'

export type View = React.ReactElement | null | undefined | boolean
export type TextValue = string | number

let flags = {
    ENABLE_AUTO_CHILD_KEYS: true,
    ENABLE_DEBUG_BACKGROUNDS: false,
}

type ViewArg = View | ViewArg[]
type UniversalViewProperties = any
type ProcessedViewArgs = {
    viewProperties: UniversalViewProperties
    viewChildren: View[] | null
    viewStylesheets: any[]
}
export function processViewArgs(...viewArgs: any[]): ProcessedViewArgs {
    let viewProperties: UniversalViewProperties = {}
    let viewChildren: View[] | null = []
    let viewStylesheets: any[] = []

    processArgsIntoPropsAndChildren(viewProperties, viewChildren, viewStylesheets, viewArgs)

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
    if (flags.ENABLE_DEBUG_BACKGROUNDS) {
        enableDebugBackgrounds(viewProperties)
    }

    if (flags.ENABLE_AUTO_CHILD_KEYS) {
        enableAutoKeysForChildren(viewChildren)
    }

    viewChildren =
        viewChildren.length === 0
            ? null // React complains if "void" tags (eg input) have non-null viewChildren (even an empty array)
            : viewChildren

    return { viewProperties, viewChildren, viewStylesheets }
}

function enableAutoKeysForChildren(children: View[]) {
    for (var i = 0; i < children.length; i++) {
        if (!React.isValidElement(children[i])) {
            continue
        }
        let child = children[i] as React.ReactElement
        if (child.key) {
            continue
        }
        let key = `ui-auto-key-${i}`
        children[i] = React.cloneElement(child, { key: key, 'ui-auto-key': key })
    }
}

function enableDebugBackgrounds(props: any) {
    if (props.style == null) {
        props.style = {}
    }
    if (props.style.background == null) {
        let randRBG = () => Math.random() * 255
        let colors = [randRBG(), randRBG(), randRBG(), 0.75]
        props.style.background = `rgba(${colors.join(',')})`
    }
}

// processArgsIntoPropsAndChildren takes a takes a list of view arguments to process,
// and populates the given set of view properties and children.
// React elements are treated as child views.
// Objects are treated as view properties.
// And Arrays are unwrapped and recursively processed.
function processArgsIntoPropsAndChildren(
    viewProperties: UniversalViewProperties,
    viewChildren: View[],
    viewStylesheets: any[],
    viewArgsToProcess: ViewArg[],
) {
    for (let viewArg of viewArgsToProcess) {
        if (!viewArg || typeof viewArg === 'boolean') {
            continue
        } else if (React.isValidElement(viewArg)) {
            viewChildren.push(viewArg)
        } else if (Array.isArray(viewArg)) {
            processArgsIntoPropsAndChildren(viewProperties, viewChildren, viewStylesheets, viewArg)
            // TODO: HACK
        } else if ((viewArg as any).__isDOMStyles) {
            viewStylesheets.push((viewArg as any).styles)
        } else if (typeof viewArg === 'object') {
            let propsArg = viewArg as UniversalViewProperties
            mergeInViewProperties(viewProperties, propsArg)
        } else {
            let errorMessage = 'Unexpected properties argument'
            // eslint-disable-next-line no-console
            console.error(errorMessage, viewArg, viewArgsToProcess)
            throw new Error(errorMessage)
        }
    }
}

// mergeInViewProperties takes the view properties processed so far, and the propsArg
// to merge in. It allows for *multiple* style properties, and will merge them together
// into one. All other properties must be declared no more than once.
function mergeInViewProperties(viewProperties: UniversalViewProperties, propsArg: UniversalViewProperties): void {
    const viewPropertiesAsAny = viewProperties as any
    const propsArgAsAny = propsArg as any
    for (const name in propsArg) {
        if (name === 'style') {
            // Allow for multiple style declaration arguments per UI view element
            // by merging together all its style declarations into one
            viewProperties.style = { ...viewProperties.style, ...propsArg.style }
        } else if (name === 'className') {
            viewProperties.className = `${viewProperties.className || ''} ${propsArg.className}`
        } else if (viewPropertiesAsAny[name] !== undefined) {
            // Non-style properties must not be declared more than once
            throw new Error(`Property key declared twice: ${name}`)
        } else {
            viewPropertiesAsAny[name] = propsArgAsAny[name]
        }
    }
}
