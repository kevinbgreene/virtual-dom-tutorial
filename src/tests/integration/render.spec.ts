import { assert } from 'chai'
import { div } from '../../main/elements'
import { render } from '../../main/render'
import { NodeCache } from '../../main/types'
import { id, className, classMap } from '../../main/attributes'

describe('render', () => {
  it('should correctly generate an element from a virtual node', () => {
    const node = div([], ['Hello World'])
    const nodeCache = new NodeCache()
    const realNode: HTMLElement = render(node, nodeCache) as HTMLElement

    assert.equal(realNode.outerHTML, '<div>Hello World</div>')
  })

  it('should correctly apply attributes to an element', () => {
    const node = div([id('test-id'), className('test-class')], ['Hello World'])
    const nodeCache = new NodeCache()
    const realNode: HTMLElement = render(node, nodeCache) as HTMLElement

    assert.equal(
      realNode.outerHTML,
      '<div id="test-id" class="test-class">Hello World</div>',
    )
  })

  it('should correctly apply classMap to an element', () => {
    const node = div(
      [
        id('test-id'),
        classMap({
          'test-class-1': true,
          'test-class-2': false,
          active: true,
        }),
      ],
      ['Hello World'],
    )
    const nodeCache = new NodeCache()
    const realNode: HTMLElement = render(node, nodeCache) as HTMLElement

    assert.equal(
      realNode.outerHTML,
      '<div id="test-id" class="test-class-1 active">Hello World</div>',
    )
  })
})
