import { Argument, TextViewElement, makeElement } from './js.ui-core'
import { ProcessStyles, Styles } from './style'

export function Style(...styles: Styles[]) {
    return styles.map(ProcessStyles)
}


export function StyleLiteral(...styles: Styles[]) {
    return styles.map(ProcessStyles)
}

Style.flexFix = function(d: number) {
    return Style({ flexBasis:d, flexShrink:0, flexGrow:0, })
}
Style.ellipsis = function(value: 'clip' | 'ellipsis' | 'fade' | string | undefined = 'ellipsis') {
    return Style({ textOverflow:value, whiteSpace:'nowrap', overflow:'hidden' })
}

type TextViewArgument = string | number | undefined | null
export function TextView(text: TextViewArgument): TextViewElement {
    return new TextViewElement(text ? text.toString() : '')
}

export let Circle = (diameter: number, ...args: Argument[]) => {
    return Div(Style({ width: diameter, height: diameter, borderRadius:diameter }), ...args)
}



// Flex elements
export let Row = makeFlexElementConstructor('row')
export let Col = makeFlexElementConstructor('column')
export let RowReverse = makeFlexElementConstructor('row-reverse')
export let ColReverse = makeFlexElementConstructor('column-reverse')

// Browser elements
export let Div = makeElementConstructor('div')
export let Span = makeElementConstructor('span')
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
export let Form = makeElementConstructor('form')
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

// Common useful elements
export let RowSpacer = () => Row({ style: { maxHeight: 14, flexBasis: 14 } })
export let ColSpacer = () => Col({ style: { maxWidth: 14, flexBasis: 14 } })


// Util
///////

function makeFlexElementConstructor(flexDirection: string) {
    return (...args: Argument[]) => {
        let flexStyles = { display: 'flex', flexDirection: flexDirection, flexGrow:1, flexShrink:1 }
        return makeElement(`ui-${flexDirection}`, { style:flexStyles }, ...args)
    }
}

function makeElementConstructor(tagName: string) {
    return (...args: Argument[]) => {
	    return makeElement(tagName, ...args)
    }
}
