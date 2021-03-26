import React from 'react'
import * as RN from 'react-native'
import { makeReactiveUI, makeStoreReactive, observeReactiveStore } from './reactive'
import { processViewArgs, TextValue, View } from './src/js.ui-core'
import { KeyProp } from './universal'
import { Alpha, BorderRadius, Flex, FlexFix, Key, Margin, Padding } from './universal'

export { Alpha, BorderRadius, Flex, FlexFix, Key, Margin, Padding }
export { makeReactiveUI, makeStoreReactive, observeReactiveStore }
export type { View } from './src/js.ui-core'

// Universal: TextView, Row, Col, Style, etc...
///////////////////////////////////////////////

export function TextView(text: TextValue, props?: RN.TextProps, styles?: RN.TextStyle): View {
    if (!props) {
        props = {}
    }
    props.style = Object.assign(props.style || {}, styles)
    return React.createElement(RN.Text, props, text.toString())
}

Row.styles = Style({ display: 'flex', flexDirection: 'row' })
export function Row(...args: NativeViewArg[]): View {
    return makeView(Row.styles, ...args)
}

Col.styles = Style({ display: 'flex', flexDirection: 'column' })
export function Col(...args: NativeViewArg[]): View {
    return makeView(Col.styles, ...args)
}

export function Style(styles: RN.ViewStyle): RN.ViewProps {
    return { style: styles }
}

// Universal StyleSheets
////////////////////////

type NamedStyles<T> = { [P in keyof T]: RN.ViewStyle | RN.TextStyle | RN.ImageStyle }
type NamedStyleSheets = { style: RN.ViewStyle } | { style: RN.TextStyle } | { style: RN.ImageStyle }
export function makeStyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>,
): { [P in keyof T]: NamedStyleSheets } {
    const styleSheets = RN.StyleSheet.create(styles) as any // HACK: "as any"
    const result: any = {}
    for (const key of Object.keys(styleSheets)) {
        result[key] = { style: styleSheets[key] }
    }
    return result
}

// View helpers: Buttons, Inputs...
///////////////////////////////////

export function Button(text: TextValue, onPress: () => void) {
    return React.createElement(RN.Button, {
        title: text.toString(),
        onPress: onPress,
    })
}

export type TextInputProps = RN.TextInputProps
export function TextInput(...props: TextInputProps[]) {
    const mergedProps = Object.assign({}, ...props)
    return React.createElement(RN.TextInput, mergedProps)
}

// Universal Style functions: BoxShadow, Ellipsis...
////////////////////////////////////////////////////

export function BoxShadow(xOffset: number, yOffset: number, shadowRadius: number, shadowColor: number | string) {
    if (typeof shadowColor === 'number') {
        shadowColor = Alpha(shadowColor)
    }
    let shadowOffset = { width: xOffset, height: yOffset }
    return Style({ shadowColor, shadowOffset, shadowRadius })
}

// Internal
///////////

type NativeViewArg = RN.ViewProps | View | NativeViewArg[] | KeyProp
function makeView(...viewArgs: NativeViewArg[]) {
    const { viewProperties, viewChildren } = processViewArgs(...viewArgs)
    return React.createElement(RN.View, viewProperties, viewChildren)
}
