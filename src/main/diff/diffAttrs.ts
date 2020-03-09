import {
  AttributeMap,
  Attribute,
  IAttribute,
  IClassAttribute,
  ClassMap,
} from '../attributes'
import { AttrType } from '../attributes'
import { IProperty } from '../attributes/props'

function diffAttribute(
  oldAttr: IAttribute | IProperty,
  newAttr: IAttribute | IProperty | undefined,
): IAttribute | IProperty | undefined {
  if (newAttr === undefined) {
    return {
      type: oldAttr.type,
      name: oldAttr.name,
      value: undefined,
    }
  } else if (oldAttr.value !== newAttr.value) {
    return newAttr
  }
}

function diffClasses(
  oldClass: IClassAttribute,
  newClass: IClassAttribute | undefined,
): IClassAttribute | undefined {
  let _diff: IClassAttribute | undefined = undefined

  if (newClass === undefined) {
    _diff = {
      type: AttrType.CLASS_MAP,
      value: {},
    }

    const classMap: ClassMap = oldClass.value

    for (const key in classMap) {
      if (classMap[key] === true) {
        _diff.value[key] = false
      }
    }

    return _diff
  } else {
    const oldClasses: ClassMap = oldClass.value
    const newClasses: ClassMap = newClass.value

    for (const key in oldClasses) {
      const oldValue = oldClasses[key]
      const newValue = newClasses[key]

      if (oldValue !== newValue) {
        _diff = _diff ?? { type: AttrType.CLASS_MAP, value: {} }
        _diff.value[key] = newValue
      }
    }

    for (const key in newClasses) {
      if (oldClasses[key] === undefined) {
        _diff = _diff ?? { type: AttrType.CLASS_MAP, value: {} }
        _diff.value[key] = newClasses[key]
      }
    }

    return _diff
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
        if (newAttr === undefined || oldAttr.type === newAttr.type) {
          const attrDiff = diffAttribute(oldAttr, newAttr)
          if (attrDiff !== undefined) {
            _diff = _diff || {}
            _diff[key] = attrDiff
          }
        } else {
          throw new Error(
            `Type of new prop ${newAttr.type} does not match old prop ${oldAttr.type}`,
          )
        }
        break

      case AttrType.CLASS_MAP:
        if (newAttr === undefined || oldAttr.type === newAttr.type) {
          const classDiff = diffClasses(oldAttr, newAttr)
          if (classDiff !== undefined) {
            _diff = _diff || {}
            _diff[key] = classDiff
          }
        } else {
          throw new Error(
            `Type of new prop ${newAttr.type} does not match old prop ${oldAttr.type}`,
          )
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
