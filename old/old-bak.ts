// old: dom.ts
//////////////

// import { Argument, TextViewElement, makeElement } from './js.ui-core'
// import { ProcessStyles, Styles } from './style'

// export function Style(...styles: Styles[]) {
//     return styles.map(ProcessStyles)
// }


// export function StyleLiteral(...styles: Styles[]) {
//     return styles.map(ProcessStyles)
// }

// Style.flexFix = function(d: number) {
//     return Style({ flexBasis:d, flexShrink:0, flexGrow:0, })
// }
// Style.ellipsis = function(value: 'clip' | 'ellipsis' | 'fade' | string | undefined = 'ellipsis') {
//     return Style({ textOverflow:value, whiteSpace:'nowrap', overflow:'hidden' })
// }

// Style.flexScrollable = {
//     y: Style({
//         overflowY: 'scroll',
//         height: 0,
//     })
// }



// type TextViewArgument = string | number | undefined | null
// export function TextView(text: TextViewArgument): TextViewElement {
//     return new TextViewElement(text ? text.toString() : '')
// }

// export let Circle = (diameter: number, ...args: Argument[]) => {
//     return Div(Style({ width: diameter, height: diameter, borderRadius:diameter }), ...args)
// }



// // Flex elements
// export let Row = makeFlexElementConstructor('row')
// export let Col = makeFlexElementConstructor('column')
// export let RowReverse = makeFlexElementConstructor('row-reverse')
// export let ColReverse = makeFlexElementConstructor('column-reverse')

// // Browser elements
// export let Div = makeElementConstructor('div')
// export let Span = makeElementConstructor('span')
// export let A = makeElementConstructor('a')
// export let Br = makeElementConstructor('br')
// export let Button = makeElementConstructor('button')
// export let H1 = makeElementConstructor('h1')
// export let H2 = makeElementConstructor('h2')
// export let H3 = makeElementConstructor('h3')
// export let H4 = makeElementConstructor('h4')
// export let H5 = makeElementConstructor('h5')
// export let H6 = makeElementConstructor('h6')
// export let Iframe = makeElementConstructor('iframe')
// export let Img = makeElementConstructor('img')
// export let Input = makeElementConstructor('input')
// export let Form = makeElementConstructor('form')
// export let Label = makeElementConstructor('label')
// export let Li = makeElementConstructor('li')
// export let Ol = makeElementConstructor('ol')
// export let Option = makeElementConstructor('option')
// export let Select = makeElementConstructor('select')
// export let Table = makeElementConstructor('table')
// export let Td = makeElementConstructor('td')
// export let Textarea = makeElementConstructor('textarea')
// export let Th = makeElementConstructor('th')
// export let Tr = makeElementConstructor('tr')
// export let Ul = makeElementConstructor('ul')

// // Common useful elements
// export let RowSpacer = () => Row({ style: { maxHeight: 14, flexBasis: 14 } })
// export let ColSpacer = () => Col({ style: { maxWidth: 14, flexBasis: 14 } })


// // Util
// ///////

// function makeFlexElementConstructor(flexDirection: string) {
//     return (...args: Argument[]) => {
//         let flexStyles = { display: 'flex', flexDirection: flexDirection, flexGrow:1, flexShrink:1 }
//         return makeElement(`ui-${flexDirection}`, { style:flexStyles }, ...args)
//     }
// }

// function makeElementConstructor(tagName: string) {
//     return (...args: Argument[]) => {
// 	    return makeElement(tagName, ...args)
//     }
// }



// old: events.ts
/////////////////

// // JS-UI Event Handlers
// ///////////////////////

// export type EventHandler =
//     ((event: Event) => void)
//     | ((event: Event) => Promise<void>)
//     | undefined

// type KeyboardEventHandler =
//     ((event: KeyboardEvent) => void)
//     | ((event: KeyboardEvent) => Promise<void>)
//     | undefined

// interface Handlers {
//     onClick?: EventHandler,
//     onKeyPress?: KeyboardEventHandler,
//     onChange?: EventHandler,
//     onPress?: EventHandler,
//     onSubmit?: EventHandler,

//     onKeyUp?: KeyboardEventHandler,
//     onKeyDown?: KeyboardEventHandler,
    
//     // Custom handlers
//     onTap?: EventHandler,
//     onKeyPressEnter?: KeyboardEventHandler,
// }

// export function Handle(handlers: Handlers) {
//     if (handlers.onClick && handlers.onTap) {
//         throw new Error('Cannot use onClick and onTap together. TODO: Support this (ask Marcus).')
//     }
//     if (handlers.onKeyPress && handlers.onKeyPressEnter) {
//         throw new Error('Cannot use onKeyPress and onKeyPressEnter together. TODO: Support this (ask Marcus).')
//     }

//     let res: any = {}
//     if (handlers.onClick) { res.onClick = handlers.onClick }
//     if (handlers.onKeyPress) { res.onKeyPress = handlers.onKeyPress }
//     if (handlers.onKeyDown) { res.onKeyDown = handlers.onKeyDown }
//     if (handlers.onKeyUp) { res.onKeyUp = handlers.onKeyUp }
//     if (handlers.onChange) { res.onChange = handlers.onChange }
//     if (handlers.onSubmit) { res.onSubmit = handlers.onSubmit }


//     if (handlers.onTap) {
//         res.style = { cursor:'pointer' }
//         res.onClick = handlers.onTap
//     }

//     if (handlers.onKeyPressEnter) {
//         res.onKeyPress = function(event: KeyboardEvent) {
//             if (event.key !== 'Enter') { return }
//             handlers.onKeyPressEnter!(event)
//         }
//     }
//     return res
// }



// old: types/HTMLProperties.ts
///////////////////////////////

// // From: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L1810
// export interface HTMLProperties {
//     accept?: string;
//     acceptCharset?: string;
//     action?: string;
//     allowFullScreen?: boolean;
//     allowTransparency?: boolean;
//     alt?: string;
//     as?: string;
//     async?: boolean;
//     autoComplete?: string;
//     autoFocus?: boolean;
//     autoPlay?: boolean;
//     capture?: boolean | string;
//     cellPadding?: number | string;
//     cellSpacing?: number | string;
//     charSet?: string;
//     challenge?: string;
//     checked?: boolean;
//     cite?: string;
//     classID?: string;
//     cols?: number;
//     colSpan?: number;
//     content?: string;
//     controls?: boolean;
//     coords?: string;
//     crossOrigin?: string;
//     data?: string;
//     dateTime?: string;
//     default?: boolean;
//     defer?: boolean;
//     disabled?: boolean;
//     download?: any;
//     encType?: string;
//     form?: string;
//     formAction?: string;
//     formEncType?: string;
//     formMethod?: string;
//     formNoValidate?: boolean;
//     formTarget?: string;
//     frameBorder?: number | string;
//     headers?: string;
//     height?: number | string;
//     high?: number;
//     href?: string;
//     hrefLang?: string;
//     htmlFor?: string;
//     httpEquiv?: string;
//     integrity?: string;
//     keyParams?: string;
//     keyType?: string;
//     kind?: string;
//     label?: string;
//     list?: string;
//     loop?: boolean;
//     low?: number;
//     manifest?: string;
//     marginHeight?: number;
//     marginWidth?: number;
//     max?: number | string;
//     maxLength?: number;
//     media?: string;
//     mediaGroup?: string;
//     method?: string;
//     min?: number | string;
//     minLength?: number;
//     multiple?: boolean;
//     muted?: boolean;
//     name?: string;
//     nonce?: string;
//     noValidate?: boolean;
//     open?: boolean;
//     optimum?: number;
//     pattern?: string;
//     placeholder?: string;
//     playsInline?: boolean;
//     poster?: string;
//     preload?: string;
//     readOnly?: boolean;
//     rel?: string;
//     required?: boolean;
//     reversed?: boolean;
//     rows?: number;
//     rowSpan?: number;
//     sandbox?: string;
//     scope?: string;
//     scoped?: boolean;
//     scrolling?: string;
//     seamless?: boolean;
//     selected?: boolean;
//     shape?: string;
//     size?: number;
//     sizes?: string;
//     span?: number;
//     src?: string;
//     srcDoc?: string;
//     srcLang?: string;
//     srcSet?: string;
//     start?: number;
//     step?: number | string;
//     summary?: string;
//     target?: string;
//     type?: string;
//     useMap?: string;
//     value?: string | ReadonlyArray<string> | number;
//     width?: number | string;
//     wmode?: string;
//     wrap?: string;
// }



// old: style.ts
////////////////

// // JS-UI Styles
// ///////////////

// type Dimension = string | number
// type Ratio = number
// type Dimensions_1to4 = Dimension
//     | [Dimension]
//     | [Dimension, Dimension]
//     | [Dimension, Dimension, Dimension]
//     | [Dimension, Dimension, Dimension, Dimension]
// type Dimension3Color1 = [Dimension, Dimension, Dimension, Color]
// type Color = string | number

// type all = number
// type topAndBottom = number
// type rightAndLeft = number
// type top = number
// type right = number
// type bottom = number
// type left = number

// type TopRightBottomLeft = string | all | [all] | [topAndBottom, rightAndLeft] | [top, rightAndLeft, bottom] | [top, right, bottom, left]
// type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'lighter' | 'normal' | 'bold' | 'bolder' // https://www.w3schools.com/cssref/pr_font_weight.asp

// export interface Styles {
//     margin?:            TopRightBottomLeft,
//     marginLeft?:        Dimension,
//     marginRight?:       Dimension,
//     padding?:           TopRightBottomLeft,
//     width?:             Dimension,
//     height?:            Dimension,
//     minWidth?:          Dimension,
//     maxWidth?:          Dimension,
//     minHeight?:         Dimension,
//     maxHeight?:         Dimension,
//     fontSize?:          Dimension,
//     boxShadow?:         string,
//     textShadow?:        Dimension3Color1,
//     border?:            string,
//     borderRadius?:      Dimensions_1to4,
//     background?:        Color,
//     color?:             Color,
//     opacity?:           number,
//     flexGrow?:          Ratio,
//     flexShrink?:        Ratio,
//     flexBasis?:         Dimension,
//     fontWeight?:        FontWeight,
//     fontFamily?:        string,
//     lineHeight?:        number,
//     letterSpacing?:     number,
    
//     textTransform?:     'uppercase' | 'lowercase' | 'capitalize',
//     textDecoration?:    'underline' | 'overline' | 'line-through' | string
//     whiteSpace?:        'nowrap' | 'normal' | 'pre' | 'pre-wrap',
//     fontStyle?:         'normal' | 'italic' | 'oblique' ,
//     textOverflow?:      'clip' | 'ellipsis' | 'fade' | string,
//     resize?:            'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit',
//     position?:          'static' | 'relative' | 'fixed' | 'absolute' | 'sticky',
//     overflow?:          'scroll' | 'hidden' | 'visible' | 'auto',
//     overflowY?:         'scroll' | 'hidden' | 'visible' | 'auto',
//     overflowX?:         'scroll' | 'hidden' | 'visible' | 'auto',
//     textAlign?:         'left' | 'right' | 'center' | 'justify',
//     alignSelf?:         'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
//     justifyContent?:    'stretch' | 'flex-start' | 'flex-end' | 'spaceBetween' | 'spaceAround',
//     alignItems?:        'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline',
//     alignContent?:      'stretch' | 'flex-start' | 'flex-end' | 'spaceBetween' | 'spaceAround',
// }


// let transform_Dimensions_1to4 = (arg: Dimensions_1to4) =>
//     Array.isArray(arg)
//         ? arg.map(transform_Dimension).join(' ')
//         : transform_Dimension(arg)

// let transform_Dimension3Color1 = ([d1, d2, d3, color]: Dimension3Color1) => {
//     let Dimensions = [d1, d2, d3].map(transform_Dimension).join(' ')
//     return `${Dimensions} ${color}`
// }

// let transform_Color = (color: Color): string => {
//     if (typeof color == 'number') {
//         if (color <= 1.0) { // black opacity
//             return `rgba(0,0,0,${color})`
//         } else {
//             throw new Error(`Got invalid color value: ${color}`)
//         }
//     } else {
//         return color
//     }
// }

// function identity(val: any) { return val }
// let transform_Ratio = identity
// let transform_string = identity
// let transform_FontWeight = identity
// let transform_TopRightBottomLeft = transform_Dimensions_1to4
// let transform_Dimension = (arg: Dimension) => typeof arg === 'number' ? arg+'px' : arg


// const transformers: any = {
//     margin:            transform_TopRightBottomLeft,
//     marginLeft:        transform_Dimension,
//     marginRight:       transform_Dimension,
//     padding:           transform_TopRightBottomLeft,
//     width:             transform_Dimension,
//     height:            transform_Dimension,
//     minWidth:          transform_Dimension,
//     maxWidth:          transform_Dimension,
//     minHeight:         transform_Dimension,
//     maxHeight:         transform_Dimension,
//     fontSize:          transform_Dimension,
//     boxShadow:         identity,
//     textShadow:        transform_Dimension3Color1,
//     border:            transform_string,
//     borderRadius:      transform_Dimensions_1to4,
//     background:        transform_Color,
//     color:             transform_Color,
//     opacity:           identity,
//     flexGrow:          transform_Ratio,
//     flexShrink:        transform_Ratio,
//     flexBasis:         transform_Dimension,
//     fontWeight:        transform_FontWeight,
//     fontFamily:        identity,
//     lineHeight:        transform_Dimension,
//     letterSpacing:     transform_Dimension,
    
//     textTransform:     identity,
//     textDecoration:    identity,
//     whiteSpace:        identity,
//     fontStyle:         identity,
//     textOverflow:      identity,
//     resize:            identity,
//     position:          identity,
//     overflow:          identity,
//     overflowY:         identity,
//     overflowX:         identity,
//     textAlign:         identity,
//     alignSelf:         identity,
//     justifyContent:    identity,
//     alignItems:        identity,
//     alignContent:      identity,
// }

// export function ProcessStyles(styles: Styles): Styles {
//     let stylesAny: any = styles
//     let res: any = {
//         __uiStyles: true
//     }
//     for (let styleName of Object.keys(styles)) {
//         let transformerFn = transformers[styleName]
//         if (!transformerFn) {
//             throw new Error(`No transformer function for style ${styleName}`)
//         }
//         let rawValue = stylesAny[styleName]
//         res[styleName] = transformerFn(rawValue)
//     }
//     return res
// }




// old: js.ui-core.ts
/////////////////////

// // js.ui - core

// // js.ui provides an idiomatic approach to creating UI code in vanilla JS.
// // It is designed to address a set of specific shortcomings of JSX.
// // Notably, JSX falls short on two fronts:
// //   - The parameters API
// //       - Klunky and difficult to specify types
// //       - inabikity to pass on props wholesapce
// //       - does not fit neatly with typescript's types
// //   - Conditional rendering
// //       - it inevitably ends up leading to errors
// //       - TOD
// // It does however handle some things that we need to manually account for
// //   - Keys
// //      - without JSX, we need to manually name every element in the UI tree
// //      - JSX resolves this by auto-generating an incrementing number as key for every
// //          child element that has no key
// //

// import React, { ReactElement } from 'react'
// import { HTMLProperties } from './types/HTMLProperties'

// export let flags = {
//     ENABLE_DEBUG_BACKGROUNDS: false,
//     ENABLE_AUTO_KEYS: true,
// }

// export let makeElement = (tagName: string, ...args: Argument[]): Element => {
//     return makeElement_(tagName, ...args)
// }

// export function Key(key: string): ElementKey {
//     return new ElementKey(key)
// }

// class ElementKey {
//     readonly key: string
//     constructor(key: string) { this.key = key }
// }

// export type Argument = Element | Properties | ElementKey | false | null | Argument[]
// export type Element = ReactElement | TextViewElement
// type ElementChild = ReactElement | string

// // type Properties = {[ key: string ]: PropertyValue }
// type Properties = JSUIProperties

// interface JSUIProperties extends HTMLProperties {
//     id?: string,
//     key?: string,
//     'ui-key'?: string,
//     '__uiStyles'?: any,
//     style?: any,
// }


// // UI Element consctruction
// ///////////////////////////

// function makeElement_(tagName: string, ...args: Argument[]): Element {

//     var props: Properties = {}
//     var children: ElementChild[] = []

//     processArgsIntoPropsAndChildren(args, props, children)

//     if (props.key) {
//         // make explicitly set keys visible in the DOM tree
//         props['ui-key'] = props.key
//     }

//     if (!tagName) {
//         // without the dash, React complains about the name casing
//         tagName = props.key+'-'
//     }

//     if (flags.ENABLE_DEBUG_BACKGROUNDS) {
//         enableDebugBackgrounds(props)
//     }
//     if (flags.ENABLE_AUTO_KEYS) {
//         enableAutoKeysForChildren(children)
//     }
    
//     return React.createElement(tagName, props,
//         children.length === 0
//         ? null // React complains if "void" tags (eg input) have non-null children (even an empty array)
//         : children.length === 1
//         ? children[0] // TODO: is this helpful at all?
//         : children
//     )
// }

// // Process arguments
// ////////////////////

// function processArgsIntoPropsAndChildren(args: Argument[], props: Properties, children: ElementChild[]) {
//     for (let i=0; i<args.length; i++) {
//         let arg = args[i]
//         if (!arg) { continue }

//         if (React.isValidElement(arg)) {
//             children.push(arg)

//         } else if (arg instanceof TextViewElement) {
//             children.push(arg.value)

//         } else if (arg instanceof ElementKey) {
//             props['key'] = arg.key

//         } else if (Array.isArray(arg)) {
//             processArgsIntoPropsAndChildren(arg as Argument[], props, children)

//         } else if (arg.__uiStyles) {
//             processStyleArg(arg, props)

//         // } else if (isFunction(arg)) {
//         //     processArgsIntoPropsAndChildren(arg(), props, children)

//         } else if (typeof arg === 'object') {
//             let propsArg = arg as Properties
//             processPropsArg(propsArg, props)
        
//         } else {
//             let errorMessage = 'Unexpected properties argument'
//             console.error(errorMessage, args, i, arg)
//             throw new Error(errorMessage)
//         }
//     }
// }

// function processPropsArg(propsArg: Properties, props: Properties): void {
//     for (const name in propsArg) {

//         if (name === 'style') {
//             // Allow for multiple style declaration arguments per UI element
//             processStyleArg(propsArg.style, props)
//             continue
//         }

//         // @ts-ignore
//         if (props[name] !== undefined) {
//             throw new Error(`Property key declared twice: ${name}`)
//         }

//         // @ts-ignore
//         props[name] = propsArg[name]
//     }
// }

// function processStyleArg(styleArg: any, props: Properties): void {
//     if (!styleArg) { return }
//     if (props.style) {
//         props.style = {...props.style, ...styleArg}
//     } else {
//         props.style = styleArg
//     }
// }


// // Flag-Enabled functionality
// /////////////////////////////

// function enableDebugBackgrounds(props: Properties) {
//     if (props.style == null) {
//         props.style = {}
//     }
//     if (props.style.background == null) {
//         let randRBG = () => Math.random() * 255
//         let colors = [randRBG(), randRBG(), randRBG(), 0.75]
//         props.style.background = `rgba(${colors.join(',')})`
//     }
// }

// function enableAutoKeysForChildren(children: ElementChild[]) {
//     if (children.length <= 0) {
//         return
//     }
//     for (var i=0; i<children.length; i++) {
//         if (!React.isValidElement(children[i])) {
//             continue
//         }
//         let child = children[i] as ReactElement
//         if (child.key) {
//             continue
//         }
//         let key = `${i}`
//         children[i] = React.cloneElement(child, { key:key, 'ui-auto-key': key })
//     }
// }


// old: style.ts
////////////////


// Helpers for common composite stylers
///

// export function boxShadow(xOffset: Dimension, yOffset: Dimension, blurRadius: Dimension, color: Color) {
//     let boxShadow = [
//         transform.Dimension(xOffset),
//         transform.Dimension(yOffset),
//         transform.Dimension(blurRadius),
//         transform.Color(color),
//     ].join(' ')
//     return { boxShadow: boxShadow }
// }

// type Color = string | number

// type Dimension = number & {} // Dimension

// type D1 = Dimension
// type D2 = [Dimension, Dimension]
// type D3 = [Dimension, Dimension, Dimension]

// let transform = {
//     Dimension: (arg: Dimension) => {
//         return typeof arg === 'number' ? arg+'px' : arg
//     },
//     Color: (color: Color): string => {
//         if (typeof color == 'number') {
//             if (color <= 1.0) { // black opacity
//                 return `rgba(0,0,0,${color})`
//             } else {
//                 throw new Error(`Got invalid color value: ${color}`)
//             }
//         } else {
//             return color
//         }
//     }    
// }




// old: js.ui-types.ts
//////////////////////

// // TODO: Clean up this file

// import {
//     ViewStyle as ReactNativeViewStyles,
//     ViewProps as ReactNativeViewProps,
//     TextStyle as ReactNativeTextStyles,
//     TextProps as ReactNativeTextProps,
// // } from './types/react-native-types'
// } from 'react-native'

// import {
//     CSSProperties as ReactCSSProperties,
//     HTMLAttributes as ReactDOMProperties,
//     ReactElement,
// // } from './types/react-types'
// } from 'react'

// export { ReactElement }

// // Compute the intersection of keys in ReactDOMStyles and ReactNativeViewStyles.
// // We use ReactNativeViewStyle values, as I believe it is the more restricted of the two.
// export type View = ReactElement

// // export type ViewStyleArg = { style:AllViewStyles }
// // export type ViewArg = ViewStyleArg | ViewProperties | View | View[] | null | undefined
// // export type DOMViewArg<T> = ViewStyleArg | DOMViewProperties<T> | View | View[] | null | undefined

// export type ViewArg =    UniversalViewProperties | View | null | undefined | ViewArg[]
// export type DOMViewArg<T> = DOMViewProperties<T> | View | null | undefined | DOMViewArg<T>[]
// export type NativeViewArg = NativeViewProperties | View | null | undefined | NativeViewArg[]

// interface Stringable { toString(): string }
// export class TextViewElement {
//     readonly value: string
//     constructor(value: Stringable) { this.value = value.toString() }
// }

// // export type ScalarTextValue = string | number | undefined
// // export type TextViewArg = ScalarTextValue | TextStyleArg // | TextProperties

// // export type TextStyleArg = { style:TextStyles, __JSUITextStyles:true }

// type TODO = string
// type ColorValue = TODO

// export type UniversalTextStyles = {
//     elipsize: TODO,
//     multiLine: TODO,
//     color?: ColorValue;
//     fontFamily?: string;
//     fontSize?: number;
//     fontStyle?: 'normal' | 'italic';
//     fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
//     letterSpacing?: number;
//     lineHeight?: number;
//     textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';

//     textDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through',
//     textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
//     textDecorationColor?: ColorValue;
    
//     textShadow?: { x: number, y: number, radius: number, color: ColorValue },

//     textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
//     testID?: string;
// }

// export type DOMViewProperties<T> = ReactDOMProperties<T>

// /// VIEW STYLES
// ///////////////

// export type DOMViewStyles = ReactCSSProperties
// export type NativeViewStyles = ReactNativeViewStyles
// export type UniversalViewStyles = {
//     // We use NativeViewStyle values, since they are more restrictive than DOM ones
//     [P in keyof SharedViewStyles]?: NativeViewStyles[P]
// }
// type AllViewStyles = DOMViewStyles | NativeViewStyles
// type NativeOnlyViewStyles = Omit<NativeViewStyles, keyof DOMViewStyles>
// type DOMOnlyViewStyles = Omit<DOMViewStyles, keyof NativeViewStyles>
// type SharedViewStyles = Omit<AllViewStyles, keyof NativeOnlyViewStyles | keyof DOMOnlyViewStyles>
// // ;((): ViewStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// // ;((): DOMOnlyViewStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// // ;((): NativeOnlyViewStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted



// // /// VIEW PROPERTIES
// // ///////////////////

// // type DOMViewProperties = ReactCSSProperties
// export type NativeViewProperties = ReactNativeViewProps
// export type UniversalViewProperties = {
//     style?: SharedViewStyles,
//     // We use NativeViewStyle values, since they are more restrictive than DOM ones
//     // [P in keyof SharedViewProperties]?: NativeViewProperties[P]
// }



// // type AllViewProperties = DOMViewProperties | NativeViewProperties
// // type NativeOnlyViewProperties = Omit<NativeViewProperties, keyof DOMViewProperties>
// // type DOMOnlyViewProperties = Omit<DOMViewProperties, keyof NativeViewProperties>
// // type SharedViewProperties = Omit<AllViewProperties, keyof NativeOnlyViewProperties | keyof DOMOnlyViewProperties>
// // ;((): ViewProperties => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// // ;((): DOMViewProperties => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// // ;((): NativeViewProperties => {return {}})(). // <- uncomment in vscode to see keys autocompleted

// //TODO
// // export type ViewProperties = any



// /// TEXT VIEW STYLES
// ////////////////////

// export type DOMTextStyles = ReactCSSProperties
// export type NativeTextStyles = ReactNativeTextStyles
// export type TextStyles = {
//     // We use NativeTextStyle values, since they are more restrictive than DOM ones
//     [P in keyof SharedTextStyles]?: NativeTextStyles[P]
// }

// type AllTextStyles = DOMTextStyles | NativeTextStyles
// type NativeOnlyTextStyles = Omit<NativeTextStyles, keyof DOMTextStyles>
// type DOMOnlyTextStyles = Omit<DOMTextStyles, keyof NativeTextStyles>
// type SharedTextStyles = Omit<AllTextStyles, keyof NativeOnlyTextStyles | keyof DOMOnlyTextStyles>
// // ((): TextStyles => {return {}})(). // <- uncomment in vscode to see keys autocompleted



// export type DOMTextProps = ReactDOMProperties<Text>
// export type NativeTextProps = ReactNativeTextProps
// // export type TextProperties = {
// //     // We use NativeTextStyle values, since they are more restrictive than DOM ones
// //     [P in keyof SharedTextProps]?: SharedTextProps[P]
// // }

// // type AllTextProps = DOMTextProps | NativeTextProps
// // type NativeOnlyTextProps = Omit<NativeTextProps, keyof DOMTextProps>
// // type DOMOnlyTextProps = Omit<DOMTextProps, keyof NativeTextProps>
// // type SharedTextProps = Omit<AllTextProps, keyof NativeOnlyTextProps | keyof DOMOnlyTextProps>
// // ;((): SharedTextProps => {return {}})() // <- uncomment in vscode to see keys autocompleted
// // ;((): NativeTextProps => {return {}})(). // <- uncomment in vscode to see keys autocompleted
// // ;((): DOMTextProps => {return {}})(). // <- uncomment in vscode to see keys autocompleted

