import React from 'react'
import * as aphrodite from 'aphrodite'

import { processViewArgs, TextValue, View } from './src/js.ui-core'

import { BorderRadius, FlexFix, Flex, Padding, Margin, Alpha } from './universal'
import { makeReactiveUI, makeStoreReactive, observeReactiveStore } from './reactive'

export { BorderRadius, FlexFix, Flex, Padding, Margin, Alpha }
export { makeReactiveUI, makeStoreReactive, observeReactiveStore }
export type { View } from './src/js.ui-core'

// Universal: TextView, Row, Col, Style, etc...
///////////////////////////////////////////////

export function TextView(text: TextValue, styles?: DOMTextStyles, props?: DOMTextProps): View {
    if (!props) {
        props = {}
    }
    props.style = Object.assign(props.style || {}, styles)
    return React.createElement('ui-text', props, text.toString())
}

Row.styles = Style<HTMLDivElement>({ display: 'flex', flexDirection: 'row' })
export function Row(...args: DOMViewArg<HTMLDivElement>[]): View {
    return makeView('ui-row', Row.styles, ...args)
}

Col.styles = Style<HTMLDivElement>({ display: 'flex', flexDirection: 'column' })
export function Col(...args: DOMViewArg<HTMLDivElement>[]): View {
    return makeView('ui-col', Col.styles, ...args)
}

export function Style<T = HTMLDivElement>(styles: DOMViewStyles): DOMViewProperties<T> {
    return { style: styles }
}

// Universal StyleSheets
////////////////////////

type StyleSheetProperties = aphrodite.CSSProperties
export function makeStyleSheet(...styles: StyleSheetProperties[]): DOMStyles {
    let combinedStyles: StyleSheetProperties = {}
    for (let style of styles) {
        if ((style as any).style) {
            style = (style as any).style
        }
        combinedStyles = { ...combinedStyles, ...style }
    }

    const styleSheet = aphrodite.StyleSheet.create({ a: combinedStyles })
    return new DOMStyles(styleSheet.a)
}

export class DOMStyles {
    constructor(private style: aphrodite.StyleDeclarationValue) {}

    readonly __isDOMStyles = true

    get props() {
        return { className: aphrodite.css(this.style) }
    }
}

// View helpers: Buttons, Inputs...
///////////////////////////////////

export let Button = makeViewConstructor<HTMLButtonElement>('button')
export let Div = makeViewConstructor<HTMLDivElement>('div')
export let Span = makeViewConstructor<HTMLSpanElement>('span')
export let TextArea = makeViewConstructor<HTMLTextAreaElement>('textarea')
export let Form = makeViewConstructor<HTMLFormElement>('form')
export let Input = makeViewConstructor<HTMLInputElement>('input')

// Ref returns a view element with the given tag and react Ref object
export function Ref<P extends React.HTMLAttributes<T>, T>(
    tag: string,
    ref: React.RefObject<T>,
    properties: React.ClassAttributes<T> & P,
    children?: React.ReactNode[],
): View {
    properties.ref = ref
    return React.createElement(tag, properties, children)
}

type OnTapHandler<T> = (event: React.MouseEvent<T, MouseEvent>) => void
OnTap.styles = { cursor: 'pointer' }
export function OnTap<T>(handler: OnTapHandler<T>) {
    return { onClick: handler, style: OnTap.styles }
}

// Universal Style functions: BoxShadow, Ellipsis...
////////////////////////////////////////////////////

export function BoxShadow<T>(xOffset: Dim, yOffset: Dim, shadowRadius: Dim, shadowColor: number | string) {
    if (typeof shadowColor === 'number') {
        shadowColor = Alpha(shadowColor)
    }
    let boxShadow = [px(xOffset), px(yOffset), px(shadowRadius), shadowColor].join(' ')
    return Style<T>({ boxShadow: boxShadow })
}

export type EllipsisValue = 'clip' | 'ellipsis' | 'fade' | string | undefined
export const Ellipsis = function <T = HTMLSpanElement>(value: EllipsisValue = 'ellipsis') {
    return Style<T>({
        display: 'inline',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: value,
    })
}

// Internal
///////////

function makeView<T>(tagName: string, ...viewArgs: DOMViewArg<T>[]) {
    const { viewProperties, viewChildren } = processViewArgs(...viewArgs)
    return React.createElement(tagName, viewProperties, viewChildren)
}

function makeViewConstructor<T>(tagName: string) {
    return (...viewArgs: DOMViewArg<T>[]) => makeView(tagName, viewArgs)
}

type Dim = number | string

function px(arg: Dim) {
    return typeof arg === 'number' ? `${arg}px` : arg
}

type DOMViewArg<T> = DOMViewProperties<T> | View | DOMViewArg<T>[] | DOMStyles
type DOMViewProperties<T> = React.HTMLProps<T>
type DOMViewStyles = React.CSSProperties
type DOMTextProps = React.HTMLAttributes<Text>
type DOMTextStyles = React.CSSProperties
