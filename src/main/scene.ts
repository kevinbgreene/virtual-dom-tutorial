import { diff } from './diff'
import { applyPatches } from './patches'
import { render } from './render'
import { Html, NodeCache } from './types'

export type Scheduler =
    (newView: Html) => void

export function scene(
    initialView: Html,
    rootNode: HTMLElement,
): Scheduler {
    let savedView: Html = initialView

    const nodeCache: NodeCache = new NodeCache()
    const domNode: Node = render(initialView, nodeCache)

    rootNode.appendChild(domNode)

    return (newView: Html): void => {
        const patches = diff(savedView, newView, nodeCache)
        applyPatches(patches, nodeCache)
        savedView = newView
    }
}
