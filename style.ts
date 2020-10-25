// JS-UI Styles
///////////////

export class UIStyles {
    private styles: any = {}

    getStyles() { return this.styles }

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

export class UIFlexStyles extends UIStyles {
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
