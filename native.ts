import React from 'react'
import * as RN from 'react-native'
import { makeReactiveUI, makeStoreReactive, observeReactiveStore } from './reactive'
import deepMerge from './src/deep-merge'
import { processViewArgs, TextValue, View } from './src/js.ui-core'
import { Alpha, BorderRadius, Flex, FlexFix, Key, KeyProp, Margin, Padding } from './universal'

export type { View } from './src/js.ui-core'
export { Alpha, BorderRadius, Flex, FlexFix, Key, Margin, Padding }
export { makeReactiveUI, makeStoreReactive, observeReactiveStore }

// Universal: TextView, Row, Col, Style, etc...
///////////////////////////////////////////////

export type TextViewProps = RN.TextProps
type TextViewArg = TextViewProps | undefined
export function TextView(text: TextValue, ...props: TextViewArg[]): View {
    let filteredProps = props.filter((prop) => !!prop) as TextViewProps[]
    let mergedProps = deepMerge(...filteredProps)
    return React.createElement(RN.Text, mergedProps, text.toString())
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

// ListView
///////////

type ListItemSeperators = {
    highlight: () => void
    unhighlight: () => void
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void
}
type RenderListViewItem<ItemT> = (item: ItemT, index?: number, seperators?: ListItemSeperators) => View
type KeyForListItem<ItemT> = (item: ItemT, index: number) => string | number
type ListViewProps<ItemT> = {
    renderItem: RenderListViewItem<ItemT>
    keyForItem: KeyForListItem<ItemT>
    horizontal?: boolean
}
// TODO: Make this take a RN.FlatListProps with some props re-written instead (e.g for horizontal)
export function ListView<ItemT>(data: ItemT[], props: ListViewProps<ItemT>, flatListProps?: RN.FlatListProps<ItemT>) {
    let renderItem: RN.ListRenderItem<ItemT> | null | undefined = ({ item, index, separators }) => {
        let view = props.renderItem(item as ItemT, index, separators)
        return React.isValidElement(view) ? view : null
    }
    let keyExtractor = function (item: ItemT, index: number) {
        return props.keyForItem(item, index).toString()
    }

    let rnProps = Object.assign({ data, renderItem, keyExtractor, horizontal: props.horizontal }, flatListProps)
    return React.createElement<RN.FlatListProps<ItemT>>(RN.FlatList, rnProps)
}

type ImageProps = RN.ImageProps
export function Image(url: string, width: number, height: number) {
    let props: ImageProps = { source: { uri: url }, style: { width, height } }
    return React.createElement(RN.Image, props)
}

export function ScrollView(props: RN.ScrollViewProps, ...content: NativeViewArg[]) {
    const { viewProperties, viewChildren } = processViewArgs(props, ...content)
    return React.createElement(RN.ScrollView, viewProperties, viewChildren)
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

export type ButtonProps = Omit<RN.ButtonProps, 'title' | 'onPress'>
export function Button(text: TextValue, props: ButtonProps, onPress: () => void) {
    return React.createElement(
        RN.Button,
        Object.assign(props, {
            title: text.toString(),
            onPress: onPress,
        }),
    )
}

export type TextInputProps = RN.TextInputProps & { ref?: any } // HACK: Support ref for focusing on next
export type TextInput = React.CElement<RN.TextInputProps, RN.TextInput> & { focus: () => void } // HACK: support manual focusing
export function TextInput(...props: TextInputProps[]) {
    const mergedProps = Object.assign({}, ...props)
    return React.createElement(RN.TextInput, mergedProps)
}

export function TouchableFill(content: View, onPress: () => void) {
    return React.createElement(
        RN.TouchableOpacity,
        {
            onPress,
            style: {
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
            },
        },
        content,
    )
}

export type TouchableProps = RN.TouchableOpacityProps
export function Touchable(props: TouchableProps, ...args: View[]) {
    const { viewProperties, viewChildren } = processViewArgs(args)
    // TODO: Remove hack
    props.activeOpacity = 0.35
    Object.assign(viewProperties, props)
    return React.createElement(RN.TouchableOpacity, props, viewChildren)
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
