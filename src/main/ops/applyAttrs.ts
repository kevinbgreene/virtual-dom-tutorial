import { IAttributes } from '../types'

export function applyAttrs(
    element: HTMLElement,
    attrs: IAttributes,
): void {
    for (const key in attrs) {
        if (attrs.hasOwnProperty(key)) {
            const value: string | undefined = attrs[key]

            if (value === undefined) {
                element.removeAttribute(key)
            } else {
                element.setAttribute(key, value)
            }
        }
    }
}
