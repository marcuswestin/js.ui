// JS-UI Event Handlers
///////////////////////

interface Handlers {
    click?: EventHandler,
    keyPress?: EventHandler,
    change?: EventHandler,
    press?: EventHandler,

    // Custom handlers
    tap?: EventHandler,
    keyboardEnter?: EventHandler,
}

export function Handle(handlers: Handlers) {
    return {
        onClick: handleOnClick(handlers.click),
        onKeyPress: handleOnKeyPress(handlers.keyPress),
        onChange: handleOnChange(handlers.change),
        onPress: handleOnPress(handlers.press),
        onTap: handleOnTap(handlers.tap),
        onKeyboardEnter: handleOnKeyboardEnter(handlers.keyboardEnter),
    }
}

let handleOnClick = makeEventHandler('onClick')
let handleOnKeyPress = makeEventHandler('onKeyPress')
let handleOnChange = makeEventHandler('onChange')
let handleOnPress = makeEventHandler('onPress')

let handleOnTap = (handler: EventHandler) => {
    let props = { style: { cursor: 'pointer' } }
    return handleOnClick(handler, props)
}

let handleOnKeyboardEnter = (handler: EventHandler) => {
    if (!handler) { return undefined }
    return handleOnKeyPress((event: Event) => {
        let keyboardEvent = event as KeyboardEvent
        if (keyboardEvent.which === 13) {
            handler(event)
        }
    })
}

type EventHandler = ((event: Event) => void) | undefined
function makeEventHandler(attrName: string) {
	return function(handler: EventHandler, props: any = {}) {
        if (!handler) { return undefined }
        props[attrName] = function(event: Event) {
            handler(event)
        }
        return props
	}
}



// function makeHandler(eventName: string, handler: EventHandler) {
//     let res: any = {}
//     res[eventName] = handler
//     return res
// }

// let onClickHandler = makeEventHandler('onClick')
// let onKeyPressHandler = makeEventHandler('onKeyPress')
// let onChangeHandler = makeEventHandler('onChange')
// let onPressHandler = makeEventHandler('onPress')

// // Custom handlers
// let onTapHandler = (handler: EventHandler) => {
//     let props = { style: { cursor: 'pointer' } }
//     return onClickHandler(handler, props)
// }

// let onKeyboardEnterHandler = (handler: EventHandler) => {
//     if (!handler) { return undefined }
//     return onKeyPressHandler((event: Event) => {
//         let keyboardEvent = event as KeyboardEvent
//         if (keyboardEvent.which === 13) {
//             handler(event)
//         }
//     })
// }

// function makeEventHandler(attrName: string) {
// 	return function(handler: EventHandler, props: any = {}) {
//         if (!handler) { return undefined }
//         props[attrName] = function(event: Event) {
//             handler(event)
//         }
//         return props
// 	}
// }







// // JS-UI Event Handlers
// ///////////////////////

// export let Handle = function() {
//     return new UIHandlers()
// }

// class UIHandlers {

//     private handlers: any = {}

//     getHandlers() { return this.handlers }

//     protected set = (prop: string, val: any) => {
//         if (prop in this.handlers) {
//             throw new Error(`Handler already set: ${prop}`)
//         }
//         this.handlers[prop] = val
//         return this
//     }


//     onClick = makeEventHandler('onClick')

//     onKeyPress = makeEventHandler('onKeyPress')

//     onChange = makeEventHandler('onChange')

//     onPress = makeEventHandler('onPress')

//     onTap = makeEventHandler('onClick', { style: { cursor: 'pointer'} })

//     onEnterPress = (eventHandler: EventHandler) => this.OnKeyPress(function(event: Event, ...curryArgs: any) {

//         let keyboardEvent = event as KeyboardEvent
//         if (keyboardEvent.which === 13) {
//             eventHandler(event, ...curryArgs)
//         }
//     })
// }

// type EventHandler = (event: Event, ...curryArgs: any) => void
// type EventHandlerAttrs = { [key: string]: any }
// function makeEventHandler(attrName: string, attrs: EventHandlerAttrs = {}) {
//     return function(handler: EventHandler, ...curryArgs: any) {
//         var res: EventHandlerAttrs = {...attrs}
//         res[attrName] = function(event: Event) {
//             handler(event, ...curryArgs)
//         }
//         return res
//     }
// }
