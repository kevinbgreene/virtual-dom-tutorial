import { AttrType } from './types'

export interface IAttribute {
  type: AttrType.ATTRIBUTE
  name: string
  value: string | boolean | undefined
}

export function attr(name: string, value: string | boolean): IAttribute {
  return {
    type: AttrType.ATTRIBUTE,
    name,
    value,
  }
}

export function id(value: string): IAttribute {
  return attr('id', value)
}

export function name(value: string): IAttribute {
  return attr('name', value)
}
