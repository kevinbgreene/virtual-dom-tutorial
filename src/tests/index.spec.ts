import { assert } from 'chai'
import { node, NodeType } from '../main'

assert.deepEqual(node('div', {}, []), {
    type: NodeType.NODE,
    tagName: 'div',
    attributes: {},
    children: [],
})
