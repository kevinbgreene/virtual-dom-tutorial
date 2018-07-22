import { assert } from 'chai'
import { diff } from '../../main/diff'
import { div, p, section, text } from '../../main/elements'
import { NodeCache, NodeType, PatchType } from '../../main/types'

describe('diff', () => {
    it('should return an empty array for identical nodes', async () => {
        const oldNode = div({}, [])
        const newNode = div({}, [])
        const nodeCache = new NodeCache()

        const patches = diff(oldNode, newNode, nodeCache)

        assert.deepEqual(patches, [])
    })

    it('should correctly diff adding attributes to node', async () => {
        const oldNode = div({}, [])
        const newNode = div({ id: 'test-div' }, [])
        const nodeCache = new NodeCache()

        const patches = diff(oldNode, newNode, nodeCache)

        assert.deepEqual(patches, [ {
            type: PatchType.PROPS,
            attributes: {
                id: 'test-div',
            },
            domNode: undefined,
        } ])
    })

    it('should correctly diff replacing children', async () => {
        const oldNode = div({ id: 'test-div', className: 'what' }, [
            section({}, []),
        ])
        const newNode = div({ id: 'test-div' }, [
            p({}, [
                text('hello'),
            ]),
        ])
        const nodeCache = new NodeCache()

        const patches = diff(oldNode, newNode, nodeCache)

        assert.deepEqual(patches, [ {
            type: PatchType.PROPS,
            attributes: {
                className: undefined,
            },
            domNode: undefined,
        }, {
            type: PatchType.REPLACE,
            node: {
                type: NodeType.NODE,
                tagName: 'p',
                attributes: {},
                children: [ {
                    type: NodeType.TEXT,
                    value: 'hello',
                } ],
            },
            domNode: undefined,
        } ])
    })
})
