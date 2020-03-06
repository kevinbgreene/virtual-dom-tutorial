export type EventCallback = (evt: Event) => void

function parentHasSelector(selector: string, node: HTMLElement): boolean {
  if (node.matches(selector)) {
    return true
  } else if (node.parentElement !== null) {
    return parentHasSelector(selector, node.parentElement)
  } else {
    return false
  }
}

export function onSelector(
  eventName: string,
  selector: string,
  callback: EventCallback,
): void {
  document.addEventListener(eventName, (evt: Event): void => {
    if (parentHasSelector(selector, evt.target as HTMLElement)) {
      callback(evt)
    }
  })
}
