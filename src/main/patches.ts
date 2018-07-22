import { applyAttrs, removeElement, replaceElement } from './ops'
import { render } from './render'
import { NodeCache, Patch, PatchType } from './types'

function applyPatch(patch: Patch, nodeCache: NodeCache): void {
    if (patch.domNode === undefined) {
        console.error(`Patch does not have DOM node to apply to.`)

    } else {
        // Execute patch
        switch (patch.type) {
            case PatchType.PROPS:
                applyAttrs(
                    (patch.domNode as HTMLElement),
                    patch.attributes,
                )
                return

            case PatchType.TEXT:
                patch.domNode.textContent = patch.value
                return

            case PatchType.REMOVE:
                removeElement(patch.domNode)
                return

            case PatchType.REPLACE:
                const toReplace: Node = patch.domNode
                const replacement: Node = render(patch.node, nodeCache)
                replaceElement(replacement, toReplace)
                return

            case PatchType.APPEND:
                const parentNode = patch.domNode
                const toAppend = render(patch.node, nodeCache)
                parentNode.appendChild(toAppend)
                return

            default:
                const _exhaustiveCheck: never = patch
                throw new Error(`Non-exhaustive match for patch[${_exhaustiveCheck}]`)
        }
    }
}

export function applyPatches(patches: Array<Patch>, nodeCache: NodeCache): void {
    // Loop through patches
    for (const patch of patches) {
        applyPatch(patch, nodeCache)
    }
}
