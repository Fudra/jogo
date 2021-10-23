import OpType from './operations'

export interface Rule {
    type: OpType,
    check: (value: Value) => boolean,
    cast: (value: any) => any | null,
    next: Array<OpType>,
}

export interface Position {
    line: Number,
    column: Number,
}

export type Value = Number | String | null;

export interface Token {
    type: OpType,
    value: Value,
    position: Position,
}