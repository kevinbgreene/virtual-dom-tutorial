import { diff } from './diff'
import { applyPatches } from './patches'
import { render } from './render'
import { Html, NodeCache } from './types'
import { requestFrame } from './utils'

export type Scheduler =
    (newView: Html) => void

export function scene(
    initialView: Html,
    rootNode: HTMLElement,
): Scheduler {
    let currentView: Html = initialView
    let scheduledView: Html | null = null

    const nodeCache: NodeCache = new NodeCache()
    const domNode: Node = render(initialView, nodeCache)

    rootNode.appendChild(domNode)

    function draw() {
        if (scheduledView !== null) {
            const patches = diff(currentView, scheduledView, nodeCache)
            applyPatches(patches, nodeCache)
            currentView = scheduledView
            scheduledView = null
        }
    }

    return (newView: Html): void => {
        if (scheduledView === null) {
            requestFrame(draw)
        }

        scheduledView = newView
    }
}
