// JS-UI Event Handlers
///////////////////////

export type EventHandler =
    ((event: Event) => void)
    | ((event: Event) => Promise<void>)
    | undefined

type KeyboardEventHandler =
    ((event: KeyboardEvent) => void)
    | ((event: KeyboardEvent) => Promise<void>)
    | undefined

interface Handlers {
    onClick?: EventHandler,
    onKeyPress?: KeyboardEventHandler,
    onChange?: EventHandler,
    onPress?: EventHandler,
    onSubmit?: EventHandler,

    onKeyUp?: KeyboardEventHandler,
    onKeyDown?: KeyboardEventHandler,
    
    // Custom handlers
    onTap?: EventHandler,
    onKeyPressEnter?: KeyboardEventHandler,
}

export function Handle(handlers: Handlers) {
    if (handlers.onClick && handlers.onTap) {
        throw new Error('Cannot use onClick and onTap together. TODO: Support this (ask Marcus).')
    }
    if (handlers.onKeyPress && handlers.onKeyPressEnter) {
        throw new Error('Cannot use onKeyPress and onKeyPressEnter together. TODO: Support this (ask Marcus).')
    }

    let res: any = {}
    if (handlers.onClick) { res.onClick = handlers.onClick }
    if (handlers.onKeyPress) { res.onKeyPress = handlers.onKeyPress }
    if (handlers.onKeyDown) { res.onKeyDown = handlers.onKeyDown }
    if (handlers.onKeyUp) { res.onKeyUp = handlers.onKeyUp }
    if (handlers.onChange) { res.onChange = handlers.onChange }
    if (handlers.onSubmit) { res.onSubmit = handlers.onSubmit }


    if (handlers.onTap) {
        res.style = { cursor:'pointer' }
        res.onClick = handlers.onTap
    }

    if (handlers.onKeyPressEnter) {
        res.onKeyPress = function(event: KeyboardEvent) {
            if (event.key !== 'Enter') { return }
            handlers.onKeyPressEnter!(event)
        }
    }
    return res
}
