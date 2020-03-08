import { IAttribute } from './attrs'
import { IProperty } from './props'
import { AttrType } from './types'

export { AttrType } from './types'
export * from './attrs'

export type Attribute = IAttribute | IProperty

export type Attributes = Array<Attribute>

export type AttributeMap = Record<string, Attribute>
