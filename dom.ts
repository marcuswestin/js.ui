import * as aphrodite from 'aphrodite'
import React from 'react'
import { makeReactiveUI, makeStoreReactive, observeReactiveStore } from './reactive'
import { processViewArgs, TextValue, View } from './src/js.ui-core'
import { Alpha, BorderRadius, Flex, FlexFix, Margin, Padding } from './universal'

export type { View } from './src/js.ui-core'
export { BorderRadius, FlexFix, Flex, Padding, Margin, Alpha }
export { makeReactiveUI, makeStoreReactive, observeReactiveStore }

// Universal: TextView, Row, Col, Style, etc...
///////////////////////////////////////////////

export function TextView(text: TextValue, styles?: DOMTextStyles, props?: DOMTextProps): View {
    if (!props) {
        props = {}
    }
    props.style = Object.assign(props.style || {}, styles)
    return React.createElement('span', props, text.toString())
}

export function Row<T = HTMLDivElement>(...args: DOMViewArg<T>[]): View {
    return makeView('div', styles.Row, ...args)
}

export function Col<T = HTMLDivElement>(...args: DOMViewArg<T>[]): View {
    return makeView('div', styles.Col, ...args)
}

export function Style<T = HTMLDivElement>(styles: DOMViewStyles): DOMViewProperties<T> {
    return { style: styles }
}

// Universal StyleSheets
////////////////////////

export function makeStyleSheet<T>(styles: aphrodite.StyleDeclaration<T>): { [K in keyof T]: DOMStyles } {
    const styleSheets = aphrodite.StyleSheet.create(styles) as any
    const result: any = {}
    for (const key of Object.keys(styleSheets)) {
        result[key] = new DOMStyles(styleSheets[key])
    }
    return result
}

export class DOMStyles {
    constructor(readonly styles: aphrodite.StyleDeclarationValue) {}

    readonly __isDOMStyles = true
}

const styles = makeStyleSheet({
    Col: {
        display: 'flex',
        flexDirection: 'column',
    },
    Row: {
        display: 'flex',
        flexDirection: 'row',
    },
    ScrollCol: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        overflowY: 'auto',
        height: 0,
    },
    OnTap: {
        cursor: 'pointer',
    },
})

// View helpers: Buttons, Inputs...
///////////////////////////////////

export let Button = makeViewConstructor<HTMLButtonElement>('button')
export let Div = makeViewConstructor<HTMLDivElement>('div')
export let Pre = makeViewConstructor<HTMLDivElement>('pre')
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
export function OnTap<T>(handler: OnTapHandler<T>) {
    return [{ onClick: handler }, styles.OnTap]
}

export function ScrollCol(...args: DOMViewArg<HTMLDivElement>[]): View {
    return makeView('div', styles.ScrollCol, ...args)
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
    const { viewProperties, viewChildren, viewStylesheets } = processViewArgs(...viewArgs)
    if (viewStylesheets.length) {
        const className = aphrodite.css(...viewStylesheets)
        if (viewProperties.className) {
            viewProperties.className += ' ' + className
        } else {
            viewProperties.className = className
        }
    }
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
