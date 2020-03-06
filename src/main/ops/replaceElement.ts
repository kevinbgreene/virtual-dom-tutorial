export function replaceElement(replacement: Node, toReplace: Node): void {
  const parentNode: Node | null = toReplace.parentNode

  if (parentNode !== null) {
    parentNode.replaceChild(replacement, toReplace)
  }
}
