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

// TODO: Image, Input, & more