import { makeAutoObservable, observe, IObservableValue, IValueDidChange } from "mobx"
import { observer } from "mobx-react-lite"
import { createElement } from "react"
import { View } from "./src/js.ui-types"

// reactive is a minimal wrapper around mobx and mobx-react-lite. It provides an
// idiomatic approach to client state management and automatic ui render updates.

// reactive usage rules:
// - For stores:
//      - Always call `makeStoreReactive(this)` in constructor()
//      - make all properties private or readonly
//           - this ensure that all mutations happen inside of class functions
//           - thanks to makeStoreReactive(this), all class functions are mobx actions
//           - this means that all property mutations are properly detected
//           - To imperatively observe a reactive store, use `observeReactiveStore(store, () => { ... })`
// - For UI functions:
//      - Wrap any UI render function in makeReactiveUI
//      - Grab store values as late as possible (https://mobx.js.org/react-integration.html#tip-grab-values-from-objects-as-late-as-possible)

// makeStoreReactive should be called within the class constructor of any Store,
// and causes all its properties, getters and setters to become reactive such that
// any `makeReactiveUI` function will automatically update on store mutation.
export function makeStoreReactive(store: any) {
    makeAutoObservable(store, undefined, { deep:undefined })
}

// makeReactiveUI takes a render function, and re-renders it any time that
// a reactive store that was used during the render function gets mutated.
// export function makeReactiveUI(fn: () => View ) {
  export function makeReactiveUI<F extends Function>(fn: F): F {
    let ObservedElement = observer((props: React.FunctionComponent<P>) => {
      return fn(...props.jsuiArgs)
    })
    return function(...args: any[]) {
      return createElement(ObservedElement, { jsuiArgs: args })
    }
  }

type ReactiveStore<T> = IObservableValue<T>
type ReactiveStoreObserver = (change: IValueDidChange) => void
// observeReactiveStore allows for observing any reactive store in imperative code (as
// opposed to through declarative makeReactiveUI code).
export function observeReactiveStore<T>(reactiveStore: ReactiveStore<T>, fn: ReactiveStoreObserver) {
    observe(reactiveStore, fn)
}



// Example:
// --------
//
// const store = new class ExampleStore {
//   private firstName: string | undefined
//   private lastName: string | undefined
// 
//   constructor() {
//     makeStoreReactive(this)
//   }
// 
//   setName(firstName: string, lastName: string) {
//     this.firstName = firstName
//     this.lastName = lastName
//   }
// 
//   get fullName() {
//     return `${this.firstName || ''} ${this.lastName || ''}`
//   }
// }
// 
// let App = makeReactiveUI(() => {
//     return <div>
//         {store.fullName}
//         <button onClick={store.setName("Alice", "Wonderland")} />
//     </div>
// })
