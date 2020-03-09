import { AttrType } from './types'

export interface IProperty {
  type: AttrType.PROPERTY
  name: string
  value: string | boolean | number | undefined
}

export function prop(name: string, value: string | boolean): IProperty {
  return {
    type: AttrType.PROPERTY,
    name,
    value,
  }
}

export function innerHTML(html: string): IProperty {
  return prop('innerHTML', html)
}

export function value(value: string): IProperty {
  return prop('value', value)
}

export function checked(value: boolean): IProperty {
  return prop('checked', value)
}

export function selected(value: boolean): IProperty {
  return prop('selected', value)
}
