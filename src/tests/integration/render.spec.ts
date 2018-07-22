import { assert } from 'chai'
import { div } from '../../main/elements'
import { render } from '../../main/render'
import { NodeCache, NodeType } from '../../main/types'

describe('render', () => {
    it('should correctly generate an element from a virtual node', async () => {
        const node = div({}, [ 'Hello World' ])
        const nodeCache = new NodeCache()
        const realNode: HTMLElement = render(node, nodeCache) as HTMLElement

        assert.equal(realNode.outerHTML, '<div>Hello World</div>')
    })
})
