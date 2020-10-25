// JS-UI Flex Layout
////////////////////

import { makeElement, Argument } from "./js.ui-core"


// Flex elements
////////////////

export let Row = (...args: Argument[]) => makeFlexElement('row', ...args)
export let Col = (...args: Argument[]) => makeFlexElement('column', ...args)

export let RowReverse = (...args: Argument[]) => makeFlexElement('row-reverse', ...args)
export let ColReverse = (...args: Argument[]) => makeFlexElement('column-reverse', args)

function makeFlexElement(flexDirection: string, ...args: Argument[]) {
	let style = { style: { display: 'flex', flexDirection: flexDirection, flexGrow:1, flexShrink:1 } }
    return makeElement(`ui-${flexDirection}`, style, ...args)
}

// // Flex item style properties
// /////////////////////////////

// function styleObj(styles: any) {
//     return { style:styles }
// }

// export let Grow = (grow: number) => { return styleObj({ flowGrow: grow }) }
// export let Shrink = (shrink: number) => { return styleObj({ flexShrink: shrink }) }
// export let Basis = (basis: number | null) => { return styleObj({ flexBasis: basis || 'auto' })}

// export let Flex = (grow = 1, shrink = 1, basis: string | number ='auto') => {
//     return styleObj({ flexGrow:grow, flexShrink:shrink, flexBasis:basis })
// }

// // Fix() => { style: { flex: '0 0 auto' } }
// // Fix(100) => { style: { flex: '0 0 100' } }
// export let Fix = (fix?: number) => {
//     return Flex(0, 0, fix || 'auto')
// }

// // Order(number) => { style: { order:number } }
// export let Order = (order: number) => {
//     return styleObj({ order:order })
// }

// // export let AlignSelf = {
// // 	Auto: styleObj({ alignSelf:'auto' }),
// // 	Start: styleObj({ alignSelf:'flex-start' }),
// // 	End: styleObj({ alignSelf:'flex-end' }),
// // 	Center: styleObj({ alignSelf:'center' }),
// // 	Baseline: styleObj({ alignSelf:'baseline' }),
// // 	Stretch: styleObj({ alignSelf:'stretch' }),
// // }


// // Flex container style properties
// //////////////////////////////////

// export let FlexWrap = styleObj({ flexWrap:true })
// export let FlexWrapReverse = styleObj({ flexWrap:'wrap-reverse' })

// export let JustifyContent = {
// 	stretch: styleObj({ justifyContent: 'stretch' }),
// 	flexStart: styleObj({ justifyContent: 'flex-start' }),
// 	flexEnd: styleObj({ justifyContent: 'flex-end' }),
// 	spaceBetween: styleObj({ justifyContent: 'space-between' }),
// 	spaceAround: styleObj({ justifyContent: 'space-around' }),
// }

// export let AlignItems = {
// 	stretch: styleObj({ alignItems: 'stretch' }),
// 	flexStart: styleObj({ alignItems: 'flex-start' }),
// 	flexEnd: styleObj({ alignItems: 'flex-end' }),
// 	center: styleObj({ alignItems: 'center' }),
// 	baseline: styleObj({ alignItems: 'baseline' }),
// }

// export let AlignContent = {
// 	stretch: styleObj({ alignContent: 'stretch' }),
// 	flexStart: styleObj({ alignContent: 'flex-start' }),
// 	flexEnd: styleObj({ alignContent: 'flex-end' }),
// 	spaceBetween: styleObj({ alignContent: 'space-between' }),
// 	spaceAround: styleObj({ alignContent: 'space-around' }),
// }
