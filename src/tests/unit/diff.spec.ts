import { assert } from 'chai'
import { diff } from '../../main/diff'
import { div, p, section, text } from '../../main/elements'
import { NodeCache, NodeType, PatchType } from '../../main/types'
import { id, className, AttrType } from '../../main/attributes'

const FAKE_NODE: any = {}

describe('diff', () => {
  it('should return an empty array for identical nodes', () => {
    const oldNode = div([], [])
    const newNode = div([], [])
    const nodeCache = new NodeCache()
    nodeCache.set(oldNode, FAKE_NODE)

    const patches = diff(oldNode, newNode, nodeCache)

    assert.deepEqual(patches, [])
  })

  it('should correctly diff adding attributes to node', () => {
    const oldNode = div([], [])
    const newNode = div([id('test-div')], [])
    const nodeCache = new NodeCache()
    nodeCache.set(oldNode, FAKE_NODE)

    const patches = diff(oldNode, newNode, nodeCache)

    assert.deepEqual(patches, [
      {
        type: PatchType.PROPS,
        attributes: {
          'attr-id': {
            type: AttrType.ATTRIBUTE,
            name: 'id',
            value: 'test-div',
          },
        },
        domNode: FAKE_NODE,
      },
    ])
  })

  it('should correctly diff replacing children', () => {
    const oldChild = section([], [])
    const oldNode = div([id('test-div'), className('what')], [oldChild])
    const newNode = div([id('test-div')], [p([], [text('hello')])])
    const nodeCache = new NodeCache()
    nodeCache.set(oldChild, FAKE_NODE)
    nodeCache.set(oldNode, FAKE_NODE)

    const patches = diff(oldNode, newNode, nodeCache)

    assert.deepEqual(patches, [
      {
        type: PatchType.PROPS,
        attributes: {
          'attr-class': {
            type: AttrType.ATTRIBUTE,
            name: 'class',
            value: undefined,
          },
        },
        domNode: FAKE_NODE,
      },
      {
        type: PatchType.REPLACE,
        node: {
          type: NodeType.NODE,
          tagName: 'p',
          attributes: {},
          children: [
            {
              type: NodeType.TEXT,
              value: 'hello',
            },
          ],
        },
        domNode: FAKE_NODE,
      },
    ])
  })
})
