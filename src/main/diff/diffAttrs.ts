import { AttributeMap, Attribute } from '../attributes'
import { AttrType } from '../attributes'

function diffAttribute(
  oldAttr: Attribute,
  newAttr: Attribute | undefined,
): Attribute | undefined {
  if (newAttr === undefined) {
    return {
      type: oldAttr.type,
      name: oldAttr.name,
      value: undefined,
    }
  } else if (oldAttr.value !== newAttr.value) {
    return {
      type: oldAttr.type,
      name: newAttr.name,
      value: newAttr.value,
    }
  }
}

export function diffAttrs(
  oldAttrs: AttributeMap,
  newAttrs: AttributeMap,
): AttributeMap | undefined {
  let _diff: AttributeMap | undefined

  for (const key in oldAttrs) {
    const oldAttr: Attribute = oldAttrs[key]
    const newAttr: Attribute | undefined = newAttrs[key]

    switch (oldAttr.type) {
      case AttrType.ATTRIBUTE:
      case AttrType.PROPERTY:
        const attrDiff = diffAttribute(oldAttr, newAttr)
        if (attrDiff !== undefined) {
          _diff = _diff || {}
          _diff[key] = attrDiff
        }
        break
      default:
        const _exhaustiveCheck: never = oldAttr
        throw new Error(`Unknown attribute type ${_exhaustiveCheck}`)
    }
  }

  for (const key in newAttrs) {
    if (oldAttrs[key] === undefined) {
      _diff = _diff || {}
      _diff[key] = newAttrs[key]
    }
  }

  return _diff
}
