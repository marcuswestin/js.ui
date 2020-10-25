// JS-UI Styles
///////////////

export function Style() { return new _FlexStyles() }

class _Styles {
    private styles: any = {}

    __getStyles() { return this.styles }

    protected set = (prop: string, val: any) => {
        if (prop in this.styles) {
            throw new Error(`Style already set: ${prop}. (Previous: ${this.styles[prop]}, new: ${val}})`)
        }
        this.styles[prop] = val
        return this
    }

    margin = (top: number, right?: number, bottom?: number, left?: number) =>
        this.set('margin', cssNumbersToPxString([top, right, bottom, left]))
    padding = (top: number, right?: number, bottom?: number, left?: number) =>
        this.set('padding', cssNumbersToPxString([top, right, bottom, left]))

    fill = () =>
        this.fillWidth().fillHeight()
    fillWidth = () =>
        this.set('width', '100%')
    fillHeight = () =>
        this.set('height', '100%')

    width = (width: number) =>
        this.set('width', width)
    height = (height: number) =>
        this.set('height', height)


    maxWidth = (maxWidth: number) =>
        this.set('maxWidth', maxWidth)
    maxHeight = (maxHeight: number) =>
        this.set('maxHeight', maxHeight)

    background = (background: string) =>
        this.set('background', background)
    color = (color: string) =>
        this.set('color', color)

    textShadow = (xOffset: number, yOffset: number, blurRadius: number, color: string) =>
        this.set('textShadow', `${xOffset} ${yOffset} ${blurRadius} ${color}`)
    boxShadow = (xOffset=0, yOffset0=0, radius=2, opacity=0.5) =>
        this.set('boxShadow', `${xOffset}px ${yOffset0}px ${radius}px rgba(0,0,0,${opacity})`)

    fontSize = (size: number) =>
        this.set('fontSize', `${size}px`)
    fontWeight = (weight: number | string) =>
        this.set('fontWeight', weight)
    textAlign = (textAlign: string) =>
        this.set('textAlign', textAlign)

    borderRadius = (radius: number) =>
        this.set('borderRadius', radius)

    overflow = (overflow: string) =>
        this.set('overflow', overflow)
    overflowY = (overflowY: string) =>
        this.set('overflowY', overflowY)
    overflowX = (overflowX: string) =>
        this.set('overflowX', overflowX)
}

class _FlexStyles extends _Styles {
    grow = (grow: number) => this.set('flexGrow', grow)
    shrink = (shrink: number) => this.set('flexShrink', shrink)
    basis = (basis: string | number | null = 'auto') => this.set('flexBasis', basis)

    flex = (grow = 1, shrink = 1, basis: string | number | null = 'auto') =>
        this.grow(grow).shrink(shrink).basis(basis)

    fix = (fix?: number) => this.flex(0, 0, fix || 'auto')

    order = (order: number) => this.set('order', order)

    flexWrap = (val: 'wrap' | 'wrap-reverse' | 'nowrap') =>
        this.set('flexWrap', val)

    alignSelf = (val: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch') =>
        this.set('alignSelf', val)

    justifyContent = (val: 'stretch' | 'flex-start' | 'flex-end' | 'spaceBetween' | 'spaceAround') =>
        this.set('justifyContent', val)

    alignItems = (val: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline') =>
        this.set('alignItems', val)

    alignContent = (val: 'stretch' | 'flex-start' | 'flex-end' | 'spaceBetween' | 'spaceAround') =>
        this.set('alignContent', val)
}

let cssNumbersToPxString = (args: (number | undefined)[]) => args.map((arg) =>
    (arg === null || arg === undefined ? ''
        : typeof arg === 'number' ? arg+'px'
            : arg)
    ).join(' ')


// type Dimension = string | number
// type Dimensions_1to4 = Dimension
//     | [Dimension, Dimension]
//     | [Dimension, Dimension, Dimension]
//     | [Dimension, Dimension, Dimension, Dimension]
// type Dimension3Color1 = [Dimension, Dimension, Dimension, Color]
// type Color = string
// interface UIStyles {
//     margin?:        Dimensions_1to4,
//     padding?:       Dimensions_1to4,
//     borderRadius?:  Dimensions_1to4,
//     width?:         Dimension,
//     height?:        Dimension,
//     minWidth?:      Dimension,
//     maxWidth?:      Dimension,
//     fontSize?:      Dimension,
//     boxShadow?:      Dimension3Color1,
//     textShadow?:     Dimension3Color1,
//     border?:         string, // Todo type-check
//     overflow?:       string,
//     overflowY?:      string,
//     overflowX?:      string,
//     background?:     Color,
//     color?:          Color,
    
//     fontWeight?:    number | string,
//     // // Custom styles
//     // fillWidth?:     boolean,
//     // fillHeight?:     boolean,
//     // fill?:      boolean,
// }

// let transform_Dimensions_1to4 = (arg: Dimensions_1to4) =>
//     Array.isArray(arg)
//         ? arg.map(transform_Dimension).join(' ')
//         : transform_Dimension(arg)

// let transform_Dimension3Color1 = (d1: Dimension, d2: Dimension, d3: Dimension, color: Color) => {
//     let dimensions = [d1, d2, d3].map(transform_Dimension).join(' ')
//     return `${dimensions} ${color}`
// }

// let transform_Color = (arg: Color) => arg

// let transform_Dimension = (arg: Dimension) =>
//     typeof arg === 'number'
//         ? arg+'px'
//         : arg

// let transform_string = (arg: string) => arg

// const transformers: any = {
//     margin:         transform_Dimensions_1to4,
//     padding:        transform_Dimensions_1to4,
//     borderRadius:   transform_Dimensions_1to4,
//     width:          transform_Dimension,
//     height:         transform_Dimension,
//     minWidth:       transform_Dimension,
//     maxWidth:       transform_Dimension,
//     minHeight:      transform_Dimension,
//     maxHeight:      transform_Dimension,
//     fontSize:       transform_Dimension,
//     boxShadow:      transform_Dimension3Color1,
//     textShadow:     transform_Dimension3Color1,
//     border:         transform_string, // Todo type-check
//     overflow:       transform_string, // Todo type-check
//     overflowY:      transform_string, // Todo type-check
//     overflowX:      transform_string, // Todo type-check
//     background:     transform_Color,
//     color:          transform_Color,

//     // // Custom styles
//     // 'fillWidth':     (v: boolean) => (v ? { height:'100%' } : null),
//     // 'fillHeight':     transform_boolean,
//     // 'fill':      transform_boolean,    
// }



// private Style(styles: any) {
//     let stylesAny: any = styles
//     let res: any = {}
//     for (let styleName of Object.keys(styles)) {
//         let transformerFn = transformers[styleName]
//         let rawValue = stylesAny[styleName]
//         res[styleName] = transformerFn(rawValue)
//     }
//     return { style: res }
// }

