// JS-UI Styles
///////////////

type UIStyles = { [key: string]: string | number | boolean | undefined }
export function Style(styles: UIStyles) {
    return { style: styles }
}

// Width & Height
type Measure = number
export let Width = (width: Measure) => Style({ width:width })
export let Height = (height: Measure) => Style({ height:height })
export let MinWidth = (width: Measure) => Style({ minWidth:width })
export let MinHeight = (height: Measure) => Style({ minHeight:height })
export let MaxWidth = (width: Measure) => Style({ maxWidth:width })
export let MaxHeight = (height: Measure) => Style({ maxHeight:height })
export let Fill = () => Style({ height: '100%', width: '100%' })

// Margin & Padding
export let Margin = (...args: number[]) => Style({ margin: cssNumbersToPxString(args) })
export let Padding = (...args: number[]) => Style({ padding: cssNumbersToPxString(args) })
let cssNumbersToPxString = (args: number[]) => args.map((arg) => (typeof arg === 'number' ? arg+'px' : arg) ).join(' ')

// Backgrounds, text & borders

export let Background = (background: string) => Style({ background:background })
export let Color = (color: string) => Style({ color:color })
export let TextShadow = (xOffset: number, yOffset: number, blurRadius: number, color: string) => Style({
    textShadow: `${xOffset} ${yOffset} ${blurRadius} ${color}`
})

export let Border = (width: number = 1, style: string='solid', color: string='#000') => {
    Style({ border:`${width}'px ${style} ${color}` })
}