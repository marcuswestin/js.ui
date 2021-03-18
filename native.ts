import {
    View as ReactNativeView,
    Text as ReactNativeText,
    Button as ReactNativeButton,
    StyleSheet as ReactNativeStyleSheet,
    ImageStyle as ReactNativeImageStyle,
    TextStyle as ReactNativeTextStyle,
    ViewStyle as ReactNativeViewStyle,
} from 'react-native'
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
    return React.createElement(ReactNativeText, properties, text)
}

setViewMakers({
    engine: 'Native',
    makeView(properties: NativeViewProperties, children: View[]) {
        return React.createElement(ReactNativeView, properties, children)
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

type NamedStyles<T> = { [P in keyof T]: ReactNativeViewStyle | ReactNativeTextStyle | ReactNativeImageStyle };
type NamedStyleSheets = { style: ReactNativeViewStyle } | { style: ReactNativeTextStyle } | { style: ReactNativeImageStyle }
export function makeStyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): { [P in keyof T]: NamedStyleSheets } {
    const styleSheets = ReactNativeStyleSheet.create(styles)
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
    return React.createElement(ReactNativeButton, {
        title: text.toString(),
        onPress: onPress,
    })
}

// export let NativeElement = React.createElement
