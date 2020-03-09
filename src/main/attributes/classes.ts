import { AttrType } from './types'

export type ClassMap = Record<string, boolean>

export interface IClassAttribute {
  type: AttrType.CLASS_MAP
  value: ClassMap
}

function classMapFromClassName(classes: string): ClassMap {
  const parts: Array<string> = classes.trim().split(' ')
  const classMap: ClassMap = {}
  const len: number = parts.length
  for (let i = 0; i < len; i++) {
    const className: string = parts[i]
    classMap[className] = true
  }
  return classMap
}

export function className(value: string): IClassAttribute {
  return {
    type: AttrType.CLASS_MAP,
    value: classMapFromClassName(value),
  }
}

export function classMap(value: ClassMap): IClassAttribute {
  return {
    type: AttrType.CLASS_MAP,
    value,
  }
}
