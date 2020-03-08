import { applyAttrs } from './ops'
import { Html, INode, IText, NodeCache, NodeType } from './types'

function createText(node: IText): Text {
  return document.createTextNode(node.value)
}

function createElement(node: INode, nodeCache: NodeCache): HTMLElement {
  const element: HTMLElement = document.createElement(node.tagName)
  const children: Array<Html> = node.children
  const len: number = children.length

  applyAttrs(element, node.attributes)

  for (let i = 0; i < len; i++) {
    const childElement: Node = render(children[i], nodeCache)
    element.appendChild(childElement)
  }

  return element
}

export function render(node: Html, nodeCache: NodeCache): HTMLElement | Text {
  switch (node.type) {
    case NodeType.NODE:
      const element: HTMLElement = createElement(node, nodeCache)
      nodeCache.set(node, element)
      return element

    case NodeType.TEXT:
      const textNode: Text = createText(node)
      nodeCache.set(node, textNode)
      return textNode

    default:
      const _exhaustiveCheck: never = node
      throw new Error(`Non-exhaustive match for ${_exhaustiveCheck}`)
  }
}
