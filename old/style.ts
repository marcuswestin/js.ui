// JS-UI Styles
///////////////

type Dimension = string | number
type Ratio = number
type Dimensions_1to4 = Dimension
    | [Dimension]
    | [Dimension, Dimension]
    | [Dimension, Dimension, Dimension]
    | [Dimension, Dimension, Dimension, Dimension]
type Dimension3Color1 = [Dimension, Dimension, Dimension, Color]
type Color = string | number

type all = number
type topAndBottom = number
type rightAndLeft = number
type top = number
type right = number
type bottom = number
type left = number

type TopRightBottomLeft = string | all | [all] | [topAndBottom, rightAndLeft] | [top, rightAndLeft, bottom] | [top, right, bottom, left]
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'lighter' | 'normal' | 'bold' | 'bolder' // https://www.w3schools.com/cssref/pr_font_weight.asp

export interface Styles {
    margin?:            TopRightBottomLeft,
    marginLeft?:        Dimension,
    padding?:           TopRightBottomLeft,
    width?:             Dimension,
    height?:            Dimension,
    minWidth?:          Dimension,
    maxWidth?:          Dimension,
    minHeight?:         Dimension,
    maxHeight?:         Dimension,
    fontSize?:          Dimension,
    boxShadow?:         string,
    textShadow?:        Dimension3Color1,
    border?:            string,
    borderRadius?:      Dimensions_1to4,
    background?:        Color,
    color?:             Color,
    opacity?:           number,
    flexGrow?:          Ratio,
    flexShrink?:        Ratio,
    flexBasis?:         Dimension,
    fontWeight?:        FontWeight,
    fontFamily?:        string,
    lineHeight?:        number,
    letterSpacing?:     number,
    
    textTransform?:     'uppercase' | 'lowercase' | 'capitalize',
    textDecoration?:    'underline' | 'overline' | 'line-through' | string
    whiteSpace?:        'nowrap' | 'normal' | 'pre' | 'pre-wrap',
    fontStyle?:         'normal' | 'italic' | 'oblique' ,
    textOverflow?:      'clip' | 'ellipsis' | 'fade' | string,
    resize?:            'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit',
    position?:          'static' | 'relative' | 'fixed' | 'absolute' | 'sticky',
    overflow?:          'scroll' | 'hidden' | 'visible' | 'auto',
    overflowY?:         'scroll' | 'hidden' | 'visible' | 'auto',
    overflowX?:         'scroll' | 'hidden' | 'visible' | 'auto',
    textAlign?:         'left' | 'right' | 'center' | 'justify',
    alignSelf?:         'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
    justifyContent?:    'stretch' | 'flex-start' | 'flex-end' | 'spaceBetween' | 'spaceAround',
    alignItems?:        'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline',
    alignContent?:      'stretch' | 'flex-start' | 'flex-end' | 'spaceBetween' | 'spaceAround',
}


let transform_Dimensions_1to4 = (arg: Dimensions_1to4) =>
    Array.isArray(arg)
        ? arg.map(transform_Dimension).join(' ')
        : transform_Dimension(arg)

let transform_Dimension3Color1 = ([d1, d2, d3, color]: Dimension3Color1) => {
    let Dimensions = [d1, d2, d3].map(transform_Dimension).join(' ')
    return `${Dimensions} ${color}`
}

let transform_Color = (color: Color): string => {
    if (typeof color == 'number') {
        if (color <= 1.0) { // black opacity
            return `rgba(0,0,0,${color})`
        } else {
            throw new Error(`Got invalid color value: ${color}`)
        }
    } else {
        return color
    }
}

function identity(val: any) { return val }
let transform_Ratio = identity
let transform_string = identity
let transform_FontWeight = identity
let transform_TopRightBottomLeft = transform_Dimensions_1to4
let transform_Dimension = (arg: Dimension) => typeof arg === 'number' ? arg+'px' : arg


const transformers: any = {
    margin:            transform_TopRightBottomLeft,
    marginLeft:        transform_Dimension,
    padding:           transform_TopRightBottomLeft,
    width:             transform_Dimension,
    height:            transform_Dimension,
    minWidth:          transform_Dimension,
    maxWidth:          transform_Dimension,
    minHeight:         transform_Dimension,
    maxHeight:         transform_Dimension,
    fontSize:          transform_Dimension,
    boxShadow:         identity,
    textShadow:        transform_Dimension3Color1,
    border:            transform_string,
    borderRadius:      transform_Dimensions_1to4,
    background:        transform_Color,
    color:             transform_Color,
    opacity:           identity,
    flexGrow:          transform_Ratio,
    flexShrink:        transform_Ratio,
    flexBasis:         transform_Dimension,
    fontWeight:        transform_FontWeight,
    fontFamily:        identity,
    lineHeight:        transform_Dimension,
    letterSpacing:     transform_Dimension,
    
    textTransform:     identity,
    textDecoration:    identity,
    whiteSpace:        identity,
    fontStyle:         identity,
    textOverflow:      identity,
    resize:            identity,
    position:          identity,
    overflow:          identity,
    overflowY:         identity,
    overflowX:         identity,
    textAlign:         identity,
    alignSelf:         identity,
    justifyContent:    identity,
    alignItems:        identity,
    alignContent:      identity,
}

export function ProcessStyles(styles: Styles): Styles {
    let stylesAny: any = styles
    let res: any = {
        __uiStyles: true
    }
    for (let styleName of Object.keys(styles)) {
        let transformerFn = transformers[styleName]
        if (!transformerFn) {
            throw new Error(`No transformer function for style ${styleName}`)
        }
        let rawValue = stylesAny[styleName]
        res[styleName] = transformerFn(rawValue)
    }
    return res
}
