import { assert } from 'chai'
import { node } from '../../main/elements'
import { NodeType } from '../../main/types'

describe('node', () => {
  it('should correctly construct a node object', async () => {
    assert.deepEqual(node('div', {}, []), {
      type: NodeType.NODE,
      tagName: 'div',
      attributes: {},
      children: [],
    })
  })
})
