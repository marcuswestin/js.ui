import React from 'react'
import * as RN from 'react-native'
import { makeReactiveUI, makeStoreReactive, observeReactiveStore } from './reactive'
import { processViewArgs, TextValue, View } from './src/js.ui-core'
import { Alpha, BorderRadius, Flex, FlexFix, Key, KeyProp, Margin, Padding } from './universal'

export type { View } from './src/js.ui-core'
export { Alpha, BorderRadius, Flex, FlexFix, Key, Margin, Padding }
export { makeReactiveUI, makeStoreReactive, observeReactiveStore }

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

// ListView
///////////

type ListItemSeperators = {
    highlight: () => void
    unhighlight: () => void
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void
}
type RenderListViewItem<ItemT> = (item: ItemT, index?: number, seperators?: ListItemSeperators) => View
type KeyForListItem<ItemT> = (item: ItemT, index?: number) => string | number
type ListViewProps<ItemT> = {
    renderItem: RenderListViewItem<ItemT>
    keyForItem: KeyForListItem<ItemT>
    horizontal?: boolean
}
export function ListView<ItemT>(data: ItemT[], props: ListViewProps<ItemT>) {
    let renderItem: RN.ListRenderItem<ItemT> | null | undefined = ({ item, index, separators }) => {
        let view = props.renderItem(item as ItemT, index, separators)
        return React.isValidElement(view) ? view : null
    }
    let keyExtractor = function (item: ItemT, index: number) {
        return props.keyForItem(item, index).toString()
    }

    let flatListProps: RN.FlatListProps<ItemT> = { data, renderItem, keyExtractor, horizontal: props.horizontal }
    return React.createElement<RN.FlatListProps<ItemT>>(RN.FlatList, flatListProps)
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
