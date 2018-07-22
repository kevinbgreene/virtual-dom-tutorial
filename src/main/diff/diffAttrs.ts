import { IAttributes } from '../types'

export function diffAttrs(
    oldAttrs: IAttributes,
    newAttrs: IAttributes,
): IAttributes | undefined {
    let _diff: IAttributes | undefined

    for (const key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            _diff = _diff || {}
            _diff[key] = newAttrs[key]
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
