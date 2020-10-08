// JS-UI Flex Layout
////////////////////

import { makeElement, Argument } from "../js.ui-core"
import { Style } from "../style/js.ui-styles"


// Flex elements
////////////////

export let Row = (...args: Argument[]) => makeFlexElement('row', ...args)
export let Col = (...args: Argument[]) => makeFlexElement('column', ...args)

export let RowReverse = (...args: Argument[]) => makeFlexElement('row-reverse', ...args)
export let ColReverse = (...args: Argument[]) => makeFlexElement('column-reverse', args)

function makeFlexElement(flexDirection: string, ...args: Argument[]) {
	let style = Style({ display: 'flex', flexDirection: flexDirection })
    return makeElement(`ui-${flexDirection}`, style, ...args)
}

interface FlexArgs { grow?: number, shrink?: number, basis?: number | string }


// Flex item style properties
/////////////////////////////

export let Grow = (grow: number) => { return Style({ flowGrow: grow }) }
export let Shrink = (shrink: number) => { return Style({ flexShrink: shrink }) }
export let Basis = (basis: number | null) => { return Style({ flexBasis: basis || 'auto' })}

export let Flex = ({ grow = 1, shrink = 1, basis } : FlexArgs) => {
    return Style({ flexGrow:grow, flexShrink:shrink, flexBasis:basis })
}

// Fix() => { style: { flex: '0 0 auto' } }
// Fix(100) => { style: { flex: '0 0 100' } }
export let Fix = (fix?: number) => {
    return Flex({ grow: 0, shrink: 0, basis: fix || 'auto' })
}

// Order(number) => { style: { order:number } }
export let Order = (order: number) => {
    return Style({ order:order })
}

export let AlignSelf = {
	Auto: Style({ alignSelf:'auto' }),
	Start: Style({ alignSelf:'flex-start' }),
	End: Style({ alignSelf:'flex-end' }),
	Center: Style({ alignSelf:'center' }),
	Baseline: Style({ alignSelf:'baseline' }),
	Stretch: Style({ alignSelf:'stretch' }),
}


// Flex container style properties
//////////////////////////////////

export let FlexWrap = Style({ flexWrap:true })
export let FlexWrapReverse = Style({ flexWrap:'wrap-reverse' })

export let JustifyContent = {
	stretch: Style({ justifyContent: 'stretch' }),
	flexStart: Style({ justifyContent: 'flex-start' }),
	flexEnd: Style({ justifyContent: 'flex-end' }),
	spaceBetween: Style({ justifyContent: 'space-between' }),
	spaceAround: Style({ justifyContent: 'space-around' }),
}

export let AlignItems = {
	stretch: Style({ alignItems: 'stretch' }),
	flexStart: Style({ alignItems: 'flex-start' }),
	flexEnd: Style({ alignItems: 'flex-end' }),
	center: Style({ alignItems: 'center' }),
	baseline: Style({ alignItems: 'baseline' }),
}

export let AlignContent = {
	stretch: Style({ alignContent: 'stretch' }),
	flexStart: Style({ alignContent: 'flex-start' }),
	flexEnd: Style({ alignContent: 'flex-end' }),
	spaceBetween: Style({ alignContent: 'space-between' }),
	spaceAround: Style({ alignContent: 'space-around' }),
}
