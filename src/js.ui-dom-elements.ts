import { makeElement } from './js.ui-core'

// Common elements with browser-defined behavior (e.g not div/span)
///////////////////////////////////////////////////////////////////

export let A = makeElementConstructor('a')
export let Br = makeElementConstructor('br')
export let Button = makeElementConstructor('button')
export let H1 = makeElementConstructor('h1')
export let H2 = makeElementConstructor('h2')
export let H3 = makeElementConstructor('h3')
export let H4 = makeElementConstructor('h4')
export let H5 = makeElementConstructor('h5')
export let H6 = makeElementConstructor('h6')
export let Iframe = makeElementConstructor('iframe')
export let Img = makeElementConstructor('img')
export let Input = makeElementConstructor('input')
export let Label = makeElementConstructor('label')
export let Li = makeElementConstructor('li')
export let Ol = makeElementConstructor('ol')
export let Option = makeElementConstructor('option')
export let Select = makeElementConstructor('select')
export let Table = makeElementConstructor('table')
export let Td = makeElementConstructor('td')
export let Textarea = makeElementConstructor('textarea')
export let Th = makeElementConstructor('th')
export let Tr = makeElementConstructor('tr')
export let Ul = makeElementConstructor('ul')
// export let Div = makeElementConstructor('div')
// export let Span = makeElementConstructor('span')

function makeElementConstructor(tagName: string) {
    return (...args: any) => {
	    return makeElement(tagName, ...args)
    }
}
