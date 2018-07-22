export function removeElement(node: Node): void {
    const parentNode: Node | null = node.parentNode

    if (parentNode !== null) {
        parentNode.removeChild(node)
    }
}
