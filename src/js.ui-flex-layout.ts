// JS-UI Flex Layout
////////////////////

import { makeElement } from "./js.ui-core"
import { Style } from "./js.ui-styles"


// Flex elements
////////////////

export let Row = (...args: UIArg) => makeFlexElement('row', ...args)
export let Col = (...args: UIArg) => makeFlexElement('column', ...args)

export let RowReverse = (...args: UIArg) => makeFlexElement('row-reverse', ...args)
export let ColReverse = (...args: UIArg) => makeFlexElement('column-reverse', args)

type UIArg = any

function makeFlexElement(flexDirection: string, ...args: UIArg) {
	let style = Style({ display: 'flex', flexDirection: flexDirection })
    return makeElement(`ui-${flexDirection}`, style, ...args)
}

interface FlexArgs { grow?: number, shrink?: number, basis?: number | string }


// Flex layout
//////////////

// export let Flex = {
// 	// Flex item style properties, for applying to itself
// 	/////////////////////////////////////////////////////

// 	// size() => { style: { flex:'1 1 auto' } }
// 	// size({ grow: 1, shrink: 1/3 }) => { style: { flex:'1 0.333333 auto' } }
// 	size: ({ grow = 1, shrink = 1, basis } : FlexArgs) => {
// 		return Style({ flexGrow:grow, flexShrink:shrink, flexBasis:basis })
// 	},
	
// 	// Fix() => { style: { flex: '0 0 auto' } }
// 	// Fix(100) => { style: { flex: '0 0 100' } }
// 	fix: (fix?: number) => {
// 		return Flex.size({ grow: 0, shrink: 0, basis: fix || 'auto' })
// 	},

// 	// Order(number) => { style: { order:number } }
// 	order: (order: number) => {
// 		return Style({ order:order })
// 	},

// 	alignSelf: {
// 		auto: Style({ alignSelf:'auto' }),
// 		start: Style({ alignSelf:'flex-start' }),
// 		end: Style({ alignSelf:'flex-end' }),
// 		center: Style({ alignSelf:'center' }),
// 		baseline: Style({ alignSelf:'baseline' }),
// 		stretch: Style({ alignSelf:'stretch' }),
// 	},



// 	// Flex container style properties, for laying out its children
// 	///////////////////////////////////////////////////////////////

// 	wrap: Style({ flexWrap:true }),
// 	wrapReverse: Style({ flexWrap:'wrap-reverse' }),

// 	justifyContent: {
// 		stretch: Style({ justifyContent: 'stretch' }),
// 		flexStart: Style({ justifyContent: 'flex-start' }),
// 		flexEnd: Style({ justifyContent: 'flex-end' }),
// 		spaceBetween: Style({ justifyContent: 'space-between' }),
// 		spaceAround: Style({ justifyContent: 'space-around' }),
// 	},
	
// 	alignItems: {
// 		stretch: Style({ alignItems: 'stretch' }),
// 		flexStart: Style({ alignItems: 'flex-start' }),
// 		flexEnd: Style({ alignItems: 'flex-end' }),
// 		center: Style({ alignItems: 'center' }),
// 		baseline: Style({ alignItems: 'baseline' }),
// 	},
	
// 	alignContent: {
// 		stretch: Style({ alignContent: 'stretch' }),
// 		flexStart: Style({ alignContent: 'flex-start' }),
// 		flexEnd: Style({ alignContent: 'flex-end' }),
// 		spaceBetween: Style({ alignContent: 'space-between' }),
// 		spaceAround: Style({ alignContent: 'space-around' }),
// 	},
// }



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

