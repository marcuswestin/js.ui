export function Flex(
    flexGrow: number = 1,
    flexShrink: number | undefined = undefined,
    flexBasis: number | undefined = undefined,
) {
    return Style({ display: 'flex', flexGrow, flexShrink, flexBasis })
}
export function FlexFix(size: number) {
    return Style({ flexGrow: 0, flexShrink: 0, flexBasis: size })
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

export function BorderRadius(
    borderTopLeftRadius: number,
    borderTopRightRadius: number = borderTopLeftRadius,
    borderBottomRightRadius: number = borderTopLeftRadius,
    borderBottomLeftRadius: number = borderTopRightRadius,
) {
    return Style({
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
    })
}

export function Alpha(alpha = 1, red = 0, green = 0, blue = 0) {
    return `rgba(${red},${green},${blue},${alpha})`
}

// The universal Style function returns a value of type `any`, in order to allow for
// all platforms to accept its results.
export function Style(styles: any): { style: any } {
    return { style: styles }
}
