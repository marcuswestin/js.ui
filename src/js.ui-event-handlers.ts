// JS-UI Event Handlers
///////////////////////

export let OnClick = makeEventHandler('onClick')
export let OnKeyPress = makeEventHandler('onKeyPress')
export let OnChange = makeEventHandler('onChange')
export let OnPress = makeEventHandler('onPress')
export let Tappable = makeEventHandler('onClick', { style: { cursor: 'pointer'} })

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
