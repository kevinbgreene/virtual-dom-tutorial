import { Html, IAttributes, INode, IText, NodeType } from './types'

export const text = (val: string): IText => ({
  type: NodeType.TEXT,
  value: val,
})

export const node = (
  tagName: string,
  attributes: IAttributes = {},
  children: Array<Html | string> = [],
): INode => ({
  type: NodeType.NODE,
  tagName,
  attributes,
  children: children.map(
    (next: Html | string): Html => {
      if (typeof next === 'string') {
        return text(next)
      } else {
        return next
      }
    },
  ),
})

export const makeNode = (tagName: string) => (
  attributes: IAttributes = {},
  children: Array<Html | string>,
): INode => node(tagName, attributes, children)

export const div = makeNode('div')
export const article = makeNode('article')
export const section = makeNode('section')
export const p = makeNode('p')

export const input = makeNode('input')
export const textarea = makeNode('textarea')

export const h1 = makeNode('h1')
export const h2 = makeNode('h2')
export const h3 = makeNode('h3')
export const h4 = makeNode('h4')
export const h5 = makeNode('h5')
export const h6 = makeNode('h6')

export const ul = makeNode('ul')
export const ol = makeNode('ol')
export const li = makeNode('li')
