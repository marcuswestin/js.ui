/* eslint-disable prettier/prettier */
import * as RN from 'react-native'
import { View, NativeViewProperties, NativeViewStyles, NativeTextProps, NativeTextStyles, NativeViewArg, TextValue } from "./src/js.ui-types"
import { makeView, setViewMakers } from "./src/js.ui-core"
import React from 'react'

import { FlexFix, Flex, Padding, Margin } from "./universal"
export { FlexFix, Flex, Padding, Margin }

import { makeReactiveUI, makeStoreReactive, observeReactiveStore } from './reactive'
export { makeReactiveUI, makeStoreReactive, observeReactiveStore }

// View maker functions
///////////////////////

function makeTextView(properties: NativeTextProps, text: TextValue) {
    return React.createElement(RN.Text, properties, text)
}

setViewMakers({
    engine: 'Native',
    makeView(properties: NativeViewProperties, children: View[]) {
        return React.createElement(RN.View, properties, children)
    },
    makeTextView,
})

// Native-specific
///////////////

Row.styles = Style({ display:'flex', flexDirection: 'row' })
export function Row(...args: NativeViewArg[]): View {
    return makeView(Row.styles, ...args)
}

Col.styles = Style({ display:'flex', flexDirection: 'column' })
export function Col(...args: NativeViewArg[]): View {
    return makeView(Col.styles, ...args)
}

type NamedStyles<T> = { [P in keyof T]: RN.ViewStyle | RN.TextStyle | RN.ImageStyle };
type NamedStyleSheets = { style: RN.ViewStyle } | { style: RN.TextStyle } | { style: RN.ImageStyle }
export function makeStyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): { [P in keyof T]: NamedStyleSheets } {
    const styleSheets = RN.StyleSheet.create(styles)
    const result: any = {}
    for (const key of Object.keys(styleSheets)) {
        result[key] = { style: styleSheets[key] }
    }
    return result
}

export function Style(styles: NativeViewStyles): NativeViewProperties {
    return { style:styles }
}

export function Text(text: TextValue, properties?: NativeTextProps, styles?: NativeTextStyles): View {
    if (!properties) { properties = {} }
    properties.style = Object.assign(properties.style || {}, styles)
    return makeTextView(properties, text.toString())
}

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

// export let NativeElement = React.createElement
