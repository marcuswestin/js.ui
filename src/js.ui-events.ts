import { Style } from "./js.ui-core";

export function OnTap(handler: () => void) {
    return [
        { onClick: handler },
        Style({ cursor: 'pointer', padding: '2px 10px', }),
    ]
}
