import { IAttribute } from './attrs'
import { IProperty } from './props'
import { IClassAttribute } from './classes'

export { AttrType } from './types'
export * from './attrs'
export * from './classes'
export * from './props'

export type Attribute = IAttribute | IProperty | IClassAttribute

export type Attributes = Array<Attribute>

export type AttributeMap = Record<string, Attribute>
