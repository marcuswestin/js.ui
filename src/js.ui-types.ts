import {
    ViewStyle as ReactNativeViewStyles,
    ViewProps as ReactNativeViewProps,
    TextStyle as ReactNativeTextStyles,
    TextProps as ReactNativeTextProps,
} from 'react-native'

import {
    CSSProperties as ReactCSSProperties,
    HTMLAttributes as ReactDOMProperties,
    HTMLProps as ReactHTMLProperties,
    ReactElement as ReactElement,
} from 'react'

// Views, and their arguments
/////////////////////////////

export type View = ReactElement
export type ViewArg =    UniversalViewProperties | View | null | undefined | ViewArg[]
export type DOMViewArg<T> = DOMViewProperties<T> | View | null | undefined | DOMViewArg<T>[]
export type NativeViewArg = NativeViewProperties | View | null | undefined | NativeViewArg[]


// View Properties, across platforms
////////////////////////////////////

export type DOMViewProperties<T> = ReactDOMProperties<T>
export type NativeViewProperties = ReactNativeViewProps
export type UniversalViewProperties = {
    // Right now we declare universal properties manually.
    style?: UniversalViewStyles,

    // If we decide to compute style types instead, then we should probably
    // use NativeViewStyle values, since they are more restrictive than DOM ones:
    // [P in keyof SharedViewProperties]?: NativeViewProperties[P]
}

// type AllViewProperties = DOMViewProperties | NativeViewProperties
// type NativeOnlyViewProperties = Omit<NativeViewProperties, keyof DOMViewProperties>
// type DOMOnlyViewProperties = Omit<DOMViewProperties, keyof NativeViewProperties>
// type SharedViewProperties = Omit<AllViewProperties, keyof NativeOnlyViewProperties | keyof DOMOnlyViewProperties>
// ;((): ViewProperties => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// ;((): DOMViewProperties => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// ;((): NativeViewProperties => {return {}})(). // <- uncomment in vscode to see keys autocompleted



// View Styles, across platforms
////////////////////////////////

// Deduce UniversalViewStyles by computing the intersection of shared keys in ReactDOMStyles
// and ReactNativeViewStyles. For the allowed values, we use ReactNativeViewStyle since it is
// the more restricted of the two. Hopefully it is a strict subset of the DOM ones, but I am
// not positive that it is. This is a bit of a gamble, and could prove unreliable, in whic
// case we would have to manually declare all the allowed properties and their values for the
// universal styles case, and then implement the translation layer ourselves.
export type DOMViewStyles = ReactCSSProperties
export type NativeViewStyles = ReactNativeViewStyles
// export type UniversalViewStyles = {
//     // This is a bit of a gamble, and could prove unreliable - see note above.
//     [P in keyof _UniversalViewStyleKeys]?: NativeViewStyles[P]
// }
// Compute UniversalViewStyleKeys, by first computing the
type _AllViewStyles = DOMViewStyles | NativeViewStyles
type _NativeOnlyViewStyles = Omit<NativeViewStyles, keyof DOMViewStyles>
type _DOMOnlyViewStyles = Omit<DOMViewStyles, keyof NativeViewStyles>
type _UniversalViewStyleKeys = Omit<_AllViewStyles, keyof _NativeOnlyViewStyles | keyof _DOMOnlyViewStyles>
// ;((): UniversalViewStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// ;((): DOMOnlyViewStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// ;((): NativeOnlyViewStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted



// TextViews and their properties and styles, across platforms
//////////////////////////////////////////////////////////////

type __TODO__ = string
type ColorValue = __TODO__

export type UniversalTextStyles = {
    elipsize: __TODO__,
    multiLine: __TODO__,
    color?: ColorValue;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';

    textDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through',
    textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
    textDecorationColor?: ColorValue;
    
    textShadow?: { x: number, y: number, radius: number, color: ColorValue },

    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    testID?: string;
}



export type DOMTextStyles = ReactCSSProperties
export type NativeTextStyles = ReactNativeTextStyles
export type TextStyles = {
    // We use NativeTextStyle values, since they are more restrictive than DOM ones
    [P in keyof SharedTextStyles]?: NativeTextStyles[P]
}

type AllTextStyles = DOMTextStyles | NativeTextStyles
type NativeOnlyTextStyles = Omit<NativeTextStyles, keyof DOMTextStyles>
type DOMOnlyTextStyles = Omit<DOMTextStyles, keyof NativeTextStyles>
type SharedTextStyles = Omit<AllTextStyles, keyof NativeOnlyTextStyles | keyof DOMOnlyTextStyles>
// ((): TextStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted


export interface TextValue { toString(): string }

export type DOMTextProps = ReactDOMProperties<Text>
export type NativeTextProps = ReactNativeTextProps
// export type TextProperties = {
//     // We use NativeTextStyle values, since they are more restrictive than DOM ones
//     [P in keyof SharedTextProps]?: SharedTextProps[P]
// }

// type AllTextProps = DOMTextProps | NativeTextProps
// type NativeOnlyTextProps = Omit<NativeTextProps, keyof DOMTextProps>
// type DOMOnlyTextProps = Omit<DOMTextProps, keyof NativeTextProps>
// type SharedTextProps = Omit<AllTextProps, keyof NativeOnlyTextProps | keyof DOMOnlyTextProps>
// ;((): SharedTextProps => {return {}})() // <- uncomment in vscode to see keys autocompleted
// ;((): NativeTextProps => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// ;((): DOMTextProps => {return {}})(). // <- uncomment in vscode to see keys autocompleted
