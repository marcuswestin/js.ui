// JS-UI Event Handlers
///////////////////////

type EventHandler =
    ((event: Event) => void)
    | ((event: Event) => Promise<void>)
    | undefined

interface Handlers {
    onClick?: EventHandler,
    onKeyPress?: EventHandler,
    onChange?: EventHandler,
    onPress?: EventHandler,
    
    // Custom handlers
    onTap?: EventHandler,
    onKeyPressEnter?: EventHandler,
}

export function Handle(handlers: Handlers) {
    if (handlers.onClick && handlers.onTap) {
        throw new Error('Cannot use onClick and onTap together. TODO: Support this (ask Marcus).')
    }
    if (handlers.onKeyPress && handlers.onKeyPressEnter) {
        throw new Error('Cannot use onKeyPress and onKeyPressEnter together. TODO: Support this (ask Marcus).')
    }

    let res: any = {
        onClick:    handlers.onClick,
        onKeyPress: handlers.onKeyPress,
        onChange:   handlers.onChange,
    }

    if (handlers.onTap) {
        res.style = { cursor:'pointer' }
        res.onClick = handlers.onTap
    }

    if (handlers.onKeyPressEnter) {
        res.onKeyPress = function(event: KeyboardEvent) {
            if (event.key !== 'enter') { return }
            handlers.onKeyPressEnter!(event)
        }
    }
    return res
}
