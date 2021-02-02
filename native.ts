import React, { View as ReactNativeView, Text as ReactNativeText } from 'react-native'
import { NativeViewProperties, NativeViewStyles, NativeTextProps, NativeTextStyles, View, UniversalViewProperties } from "./src/js.ui-types"
import { setViewMakers } from "./src/js.ui-core"

import { Row, Col, TextView, FlexFix, Flex, Padding, Margin } from "./universal"
export { Row, Col, TextView, FlexFix, Flex, Padding, Margin }

// View maker functions
///////////////////////

setViewMakers({
    engine: 'Native',
    makeView(properties: NativeViewProperties, children: View[]) {
        return React.createElement(ReactNativeView, properties, children)
    },
    makeTextView(properties: NativeTextProps, text: string) {
        return React.createElement(ReactNativeText, properties, text)
    },
})

// Native-specific
///////////////

export function NativeTextView(text: string, properties?: NativeTextProps, styles?: NativeTextStyles): View {
    properties.style = Object.assign(properties.style, styles)
    return React.createElement('span', properties, text)
}

export function Style(styles: NativeViewStyles): UniversalViewProperties {
    return { style:styles }
}

export let NativeElement = React.createElement