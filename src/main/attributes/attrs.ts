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

type AttributeFactory = (value: string | boolean) => IAttribute

function makeAttr(name: string): AttributeFactory {
  return (value: string | boolean) => attr(name, value)
}

export const id = makeAttr('id')
export const name = makeAttr('name')
export const className = makeAttr('class')
