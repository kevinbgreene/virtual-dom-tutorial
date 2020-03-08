import { assert } from 'chai'
import { node } from '../../main/elements'
import { NodeType } from '../../main/types'

describe('elements', () => {
  it('should correctly construct a node object', () => {
    assert.deepEqual(node('div', [], []), {
      type: NodeType.NODE,
      tagName: 'div',
      attributes: {},
      children: [],
    })
  })
})
