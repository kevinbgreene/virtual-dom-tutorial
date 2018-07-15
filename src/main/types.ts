export const enum NodeType {
    NODE,
    TEXT,
}

export interface IAttributes {
    [name: string]: string | undefined
}

export interface INode {
    type: NodeType.NODE
    tagName: string
    attributes: IAttributes
    children: Array<Html>
}

export interface IText {
    type: NodeType.TEXT
    value: string
}

export type Html =
    INode | IText

export const enum PatchType {
    APPEND,
    REPLACE,
    REMOVE,
    PROPS,
    TEXT,
}

export interface IAppendPatch {
    type: PatchType.APPEND
    node: Html
    domNode: Node
}

export interface IReplacePatch {
    type: PatchType.REPLACE
    node: Html
    domNode: Node
}

export interface IRemovePatch {
    type: PatchType.REMOVE
    domNode: Node
}

export interface IPropsPatch {
    type: PatchType.PROPS
    attributes: IAttributes
    domNode: Node
}

export interface ITextPatch {
    type: PatchType.TEXT
    value: string
    domNode: Node
}

export type Patch =
    IAppendPatch | IReplacePatch | IRemovePatch |
    IPropsPatch | ITextPatch

export class NodeCache extends WeakMap<Html, Node> {
    public replace(oldKey: Html, newKey: Html): Node {
        // If the node is not in cache something is very wrong.
        const value: Node = this.get(oldKey)!
        this.delete(oldKey)
        this.set(newKey, value)
        return value
    }
}
