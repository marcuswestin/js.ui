import { UniversalTextStyles, UniversalViewStyles, UniversalViewProperties, View, ViewArg, TextValue } from "./src/js.ui-types";
import { makeView, viewMakers } from "./src/js.ui-core";

export function Row(...args: ViewArg[]): View {
    let styles = Style({ display:'flex', flexDirection: 'row', flexGrow:1, flexShrink:1 })
    return makeView(styles, ...args)
}
export function Col(...args: ViewArg[]): View {
    let styles = Style({ display:'flex', flexDirection: 'column', flexGrow:1, flexShrink:1 })
    return makeView(styles, ...args)
}

export function Style(styles: UniversalViewStyles): UniversalViewProperties {
    return { style:styles }
}

export function FlexSize(flexGrow: number, flexShrink: number, flexBasis: number = 0) {
    return Style({ flexGrow, flexShrink, flexBasis })
}
export function FlexFix(size: number) {
    return Style({ flexGrow: 0, flexShrink: 0, flexBasis: size })
}

export type EventHandler = ((event: any) => void)
export function OnTap(handler: EventHandler) {
    return { style: { cursor:'pointer'}, onClick: handler } // as any
}

export function TextView(value: TextValue, styles?: UniversalTextStyles) {
    return viewMakers.makeTextView({ style: styles }, value.toString())
}

// Universal style helper functions
///////////////////////////////////

// Dimension is either a length or a percentage
type Dimension = number | string

// Padding and margin work different in DOM and Native. Native does not support the
// 4-value shorthand, but instead has paddingVertical and paddingHorizontal (and the
// equivalent for margin). This helper function normalizes the 4-value shorthand of
// [top, right, bottom, left], and allows for each value to be declared independently,
// either as a number or as a string.
export function Padding(
    paddingTop: Dimension,
    paddingRight: Dimension = paddingTop,
    paddingBottom: Dimension = paddingTop,
    paddingLeft: Dimension = paddingRight,
) {
    return Style({ paddingTop, paddingRight, paddingBottom, paddingLeft })
}

export function Margin(
    marginTop: Dimension,
    marginRight: Dimension = marginTop,
    marginBottom: Dimension = marginTop,
    marginLeft: Dimension = marginRight,
) {
    return Style({ marginTop, marginRight, marginBottom, marginLeft })
}



// TODO: Image, Input, & more