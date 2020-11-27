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

// export type DOMViewProperties = ReactCSSProperties
// export type NativeViewProperties = ReactNativeViewProps
// export type ViewProperties = {
//     // We use NativeViewStyle values, since they are more restrictive than DOM ones
//     [P in keyof SharedViewProperties]?: NativeViewProperties[P]
// }

// type AllViewProperties = DOMViewProperties | NativeViewProperties
// type NativeOnlyViewProperties = Omit<NativeViewProperties, keyof DOMViewProperties>
// type DOMOnlyViewProperties = Omit<DOMViewProperties, keyof NativeViewProperties>
// type SharedViewProperties = Omit<AllViewProperties, keyof NativeOnlyViewProperties | keyof DOMOnlyViewProperties>
// // ((): ViewProperties => {return {}})(). // <- uncomment in vscode for seeing keys

//TODO
export type ViewProperties = any



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
//     [P in keyof SharedTextProps]?: SharedTextProps[P];
// }

// type AllTextProps = DOMTextProps | NativeTextProps
// type NativeOnlyTextProps = Omit<NativeTextProps, keyof DOMTextProps>
// type DOMOnlyTextProps = Omit<DOMTextProps, keyof NativeTextProps>
// type SharedTextProps = Omit<AllTextProps, keyof NativeOnlyTextProps | keyof DOMOnlyTextProps>
// ((): SharedTextProps => {return {}})(). // <- uncomment in vscode for seeing keys
























// /// TEXT STYLES
// ///////////////

// export type DOMTextStyles = ReactCSSProperties
// export type NativeTextStyles = ReactNativeTextStyles
// export type SharedTextStyles = DOMTextStyles | NativeTextStyles
// type BaseTextStyles = NativeTextStyles

// export type TextStyles = Omit<TextStyle, keyof ViewStyle> 

// export type TextStyles = Omit{BaseTextStyles, 

//     [P in keyof SharedTextStyleKeys]?: BaseTextStyles[P]
// }
// let _sharedTextStyles: SharedTextStyles = {}; 
// // _sharedTextStyles. // <- uncomment in vscode for seeing the shared keys





// // Here are the keys, to be used with [P keyof SharedViewStyleKeys]:
// interface SharedViewStyleKeys {
//     alignContent: never,
//     alignItems: never,
//     alignSelf: never,
//     aspectRatio: never,
//     backfaceVisibility: never,
//     backgroundColor: never,
//     borderBottomColor: never,
//     borderBottomLeftRadius: never,
//     borderBottomRightRadius: never,
//     borderBottomWidth: never,
//     borderColor: never,
//     borderLeftColor: never,
//     borderLeftWidth: never,
//     borderRadius: never,
//     borderRightColor: never,
//     borderRightWidth: never,
//     borderStyle: never,
//     borderTopColor: never,
//     borderTopLeftRadius: never,
//     borderTopRightRadius: never,
//     borderTopWidth: never,
//     borderWidth: never,
//     bottom: never,
//     direction: never,
//     display: never,
//     flex: never,
//     flexBasis: never,
//     flexDirection: never,
//     flexGrow: never,
//     flexShrink: never,
//     flexWrap: never,
//     height: never,
//     justifyContent: never,
//     left: never,
//     margin: never,
//     marginBottom: never,
//     marginLeft: never,
//     marginRight: never,
//     marginTop: never,
//     maxHeight: never,
//     maxWidth: never,
//     minHeight: never,
//     minWidth: never,
//     opacity: never,
//     overflow: never,
//     padding: never,
//     paddingBottom: never,
//     paddingLeft: never,
//     paddingRight: never,
//     paddingTop: never,
//     position: never,
//     right: never,
//     top: never,
//     transform: never,
//     width: never,
//     zIndex: never,
// }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


// //     return c
// // }




// // // interface Foo extends ReactDOMStyles, ReactNativeViewStyles {}

// // // let asd: CSSProperties
// // // let wqe: ViewStyle
// // // wqe.alignContent = 'center'
// // // asd.alignContent = 'center'

// // // let foo: JSUIStyles = {
// // //     alignContent: 'center'
// // // }


// // // function wq(a: Foo): F {

// // // }

// // // type KeyOfDOMStyles = keyof ReactDOMStyles
// // // type KeyOfReactNativeStyles = keyof ReactNativeViewStyles

// // // type PartialKeyOfDOMStyles = { [P in keyof ReactDOMStyles]?: ReactDOMStyles[P] }
// // // type PartialKeyOfReactNativeStyles = { [P in keyof ReactNativeViewStyles]?: ReactNativeViewStyles[P] }

// // // type PartialUnion = PartialKeyOfDOMStyles | PartialKeyOfReactNativeStyles
// // // function styles_PartialUnion(s: PartialUnion): PartialUnion {
// // //     return s
// // // }
// // // styles_PartialUnion({ WebkitAlignContent: 'center' })

// // // type KeyOfJSUIStyles = KeyOfDOMStyles | KeyOfReactNativeStyles

// // // let keyOfTest: KeyOfJSUIStyles = {
    
// // // }



// // // function styles(s: JSUIStyles): s is JSUIStyles {
// // //     return true
// // // }

// // // styles({ WebkitAlignContent:'baseline' })

// // // let bar: ReactDOMStyles | ReactNativeViewStyles = {}
// // // bar.
