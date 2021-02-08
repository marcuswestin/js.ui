import { View as ReactNativeView, Text as ReactNativeText } from 'react-native'
import { View, NativeViewProperties, NativeViewStyles, NativeTextProps, NativeTextStyles, NativeViewArg, TextValue } from "./src/js.ui-types"
import { makeView, setViewMakers } from "./src/js.ui-core"
import React from 'react'

import { FlexFix, Flex, Padding, Margin } from "./universal"
export { FlexFix, Flex, Padding, Margin }

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

export function Style(styles: NativeViewStyles): NativeViewProperties {
    return { style:styles }
}

export function Text(text: TextValue, properties?: NativeTextProps, styles?: NativeTextStyles): View {
    if (!properties) { properties = {} }
    properties.style = Object.assign(properties.style || {}, styles)
    return makeTextView(properties, text.toString())
}

// export let NativeElement = React.createElement