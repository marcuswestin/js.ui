import { UniversalTextStyles, UniversalViewStyles, View, ViewArg, TextValue } from "./src/js.ui-types";
import { makeView, viewMakers } from "./src/js.ui-core";

export function Row(...args: ViewArg[]): View {
    let styles = Style({ display:'flex', flexDirection: 'row' })
    return makeView(styles, ...args)
}
export function Col(...args: ViewArg[]): View {
    let styles = Style({ display:'flex', flexDirection: 'column' })
    return makeView(styles, ...args)
}

export function Flex(flexGrow: number = 1, flexShrink: number = 1, flexBasis: number = 0) {
    return Style({ display:'flex', flexGrow, flexShrink, flexBasis })
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

// The universal Style function returns a value of type `any`, in order to allow for
// all platforms to accept its results.
export function Style(styles: UniversalViewStyles): { style: any } {
    return { style:styles }
}




// TODO: Image, Input, & more