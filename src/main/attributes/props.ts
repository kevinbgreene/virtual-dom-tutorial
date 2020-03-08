import { AttrType } from './types'

export interface IProperty {
  type: AttrType.PROPERTY
  name: string
  value: string | boolean | undefined
}

export function prop(name: string, value: string | boolean): IProperty {
  return {
    type: AttrType.PROPERTY,
    name,
    value,
  }
}
