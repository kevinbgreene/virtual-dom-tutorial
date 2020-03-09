import { AttributeMap, Attribute, AttrType } from '../attributes'
import { IAttribute } from '../attributes/attrs'
import { IProperty } from '../attributes/props'
import { ClassMap, IClassAttribute } from '../attributes/classes'

export function applyAttribute(element: HTMLElement, attr: IAttribute): void {
  if (attr.value === true) {
    element.setAttribute(attr.name, '')
  } else if (attr.value === false || attr.value === undefined) {
    element.removeAttribute(attr.name)
  } else {
    element.setAttribute(attr.name, attr.value)
  }
}

export function applyProperty(element: HTMLElement, attr: IProperty): void {
  ;(element as any)[attr.name] = attr.value
}

export function applyClasses(
  element: HTMLElement,
  attr: IClassAttribute,
): void {
  const classMap: ClassMap = attr.value
  for (const key in classMap) {
    if (classMap[key]) {
      element.classList.add(key)
    } else {
      element.classList.remove(key)
    }
  }
}

export function applyAttrs(element: HTMLElement, attrs: AttributeMap): void {
  for (const key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      const attr: Attribute = attrs[key]

      switch (attr.type) {
        case AttrType.ATTRIBUTE:
          applyAttribute(element, attr)
          break

        case AttrType.PROPERTY:
          applyProperty(element, attr)
          break

        case AttrType.CLASS_MAP:
          applyClasses(element, attr)
          break

        default:
          const _exhaustiveCheck: never = attr
          throw new Error(`Unknown attribute type ${_exhaustiveCheck}`)
      }
    }
  }
}
