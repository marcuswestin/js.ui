
// Helpers for common composite stylers
///

export function boxShadow(xOffset: Dimension, yOffset: Dimension, blurRadius: Dimension, color: Color) {
    let boxShadow = [
        transform.Dimension(xOffset),
        transform.Dimension(yOffset),
        transform.Dimension(blurRadius),
        transform.Color(color),
    ].join(' ')
    return { boxShadow: boxShadow }
}

type Color = string | number

type Dimension = number & {} // Dimension

type D1 = Dimension
type D2 = [Dimension, Dimension]
type D3 = [Dimension, Dimension, Dimension]

let transform = {
    Dimension: (arg: Dimension) => {
        return typeof arg === 'number' ? arg+'px' : arg
    },
    Color: (color: Color): string => {
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
}

