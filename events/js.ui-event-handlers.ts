// JS-UI Event Handlers
///////////////////////

export let HandleClick = makeEventHandler('onClick')
export let HandleKeyPress = makeEventHandler('onKeyPress')
export let HandleChange = makeEventHandler('onChange')
export let HandlePress = makeEventHandler('onPress')
export let HandleTap = makeEventHandler('onClick', { style: { cursor: 'pointer'} })

type EventHandler = (event: Event, ...curryArgs: any) => void
type EventHandlerAttrs = { [key: string]: any }
function makeEventHandler(attrName: string, attrs: EventHandlerAttrs = {}) {
	return function(handler: EventHandler, ...curryArgs: any) {
		var res: EventHandlerAttrs = {...attrs}
		res[attrName] = function(event: Event) {
			handler(event, ...curryArgs)
		}
		return res
	}
}
