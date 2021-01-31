import React, { ClassAttributes, HTMLAttributes } from 'react'
import { DOMViewProperties, DOMViewStyles, DOMTextProps, DOMTextStyles, View, DOMViewArg, TextValue } from "./src/js.ui-types"
import { makeView, setViewMakers } from "./src/js.ui-core"

import { TextView, FlexFix, FlexSize } from "./universal"
export { TextView, FlexFix, FlexSize }

// View maker functions
///////////////////////

setViewMakers({
    engine: 'DOM',
    makeView(properties: DOMViewProperties<HTMLDivElement>, children: View[]) {
        return React.createElement('div', properties, children)
    },
    makeTextView(properties: DOMTextProps, text: string) {
        return React.createElement('span', properties, text)
    },
})

// DOM-specific Rows, Cols, Style, TextViews, etc
/////////////////////////////////////////////////

Row.styles = Style({ display:'flex', flexDirection: 'row', flexGrow:1, flexShrink:1 })
export function Row(...args: DOMViewArg<HTMLDivElement>[]): View {
    return makeView(Row.styles, ...args)
}

Col.styles = Style({ display:'flex', flexDirection: 'column', flexGrow:1, flexShrink:1 })
export function Col(...args: DOMViewArg<HTMLDivElement>[]): View {
    return makeView(Col.styles, ...args)
}

export function Style<T>(styles: DOMViewStyles): DOMViewProperties<T> {
    return { style:styles }
}

export function DOMTextView(value: TextValue, properties?: DOMTextProps, styles?: DOMTextStyles): View {
    if (!properties) { properties = {} }
    properties.style = Object.assign(properties.style, styles)
    return React.createElement('span', properties, value.toString())
}

export type EventHandler<T> = (event: React.MouseEvent<T, MouseEvent>) => void
export function OnTap<T>(handler: EventHandler<T>) {
    return { style: { cursor:'pointer'}, onClick: handler }
}

// Ref returns a view element with the given tag and react Ref object
export function Ref<P extends HTMLAttributes<T>, T>(tag: string, ref: React.RefObject<T>, properties: ClassAttributes<T> & P, children?: React.ReactNode[]): View {
    properties.ref = ref
    return React.createElement(tag, properties, children)
}

// DomElement allows you to create any react DOM element
export function DOMElement<T>(tag: string, properties: DOMViewProperties<T>, children: View[]) {
    return React.createElement(tag, properties, children)
}
