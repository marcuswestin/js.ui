import {
    ViewStyle as ReactNativeViewStyles,
    ViewProps as ReactNativeViewProps,
    TextStyle as ReactNativeTextStyles,
    TextProps as ReactNativeTextProps,
} from './types/react-native-types'

import {
    CSSProperties as ReactCSSProperties,
    HTMLAttributes as ReactDOMProperties,
} from './types/react-types'


// Compute the intersection of keys in ReactDOMStyles and ReactNativeViewStyles.
// We use ReactNativeViewStyle values, as I believe it is the more restricted of the two.


/// VIEW STYLES
///////////////

export type DOMViewStyles = ReactCSSProperties
export type NativeViewStyles = ReactNativeViewStyles
export type ViewStyles = {
    // We use NativeViewStyle values, since they are more restrictive than DOM ones
    [P in keyof SharedViewStyles]?: NativeViewStyles[P]
}

type AllViewStyles = DOMViewStyles | NativeViewStyles
type NativeOnlyViewStyles = Omit<NativeViewStyles, keyof DOMViewStyles>
type DOMOnlyViewStyles = Omit<DOMViewStyles, keyof NativeViewStyles>
type SharedViewStyles = Omit<AllViewStyles, keyof NativeOnlyViewStyles | keyof DOMOnlyViewStyles>
// ((): ViewStyles => {return {}})() // <- uncomment in vscode for seeing keys


// /// VIEW PROPERTIES
// ///////////////////

export type DOMViewProperties = ReactCSSProperties
export type NativeViewProperties = ReactNativeViewProps
export type ViewProperties = {
    // We use NativeViewStyle values, since they are more restrictive than DOM ones
    [P in keyof SharedViewProperties]?: NativeViewProperties[P]
}

type AllViewProperties = DOMViewProperties | NativeViewProperties
type NativeOnlyViewProperties = Omit<NativeViewProperties, keyof DOMViewProperties>
type DOMOnlyViewProperties = Omit<DOMViewProperties, keyof NativeViewProperties>
type SharedViewProperties = Omit<AllViewProperties, keyof NativeOnlyViewProperties | keyof DOMOnlyViewProperties>
// // ((): ViewProperties => {return {}})(). // <- uncomment in vscode for seeing keys

//TODO
// export type ViewProperties = any



/// TEXT VIEW STYLES
////////////////////

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
// ((): TextStyles => {return {}})(). // <- uncomment in vscode for seeing keys



// export type DOMTextProps = ReactDOMProperties<Text>
// export type NativeTextProps = ReactNativeTextProps
// export type TextProperties = {
//     // We use NativeTextStyle values, since they are more restrictive than DOM ones
//     [P in keyof SharedTextProps]?: SharedTextProps[P]
// }

// type AllTextProps = DOMTextProps | NativeTextProps
// type NativeOnlyTextProps = Omit<NativeTextProps, keyof DOMTextProps>
// type DOMOnlyTextProps = Omit<DOMTextProps, keyof NativeTextProps>
// type SharedTextProps = Omit<AllTextProps, keyof NativeOnlyTextProps | keyof DOMOnlyTextProps>
