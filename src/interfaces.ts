import OpType from './operations'

export interface Rule {
    type: OpType,
    check: (value: string) => boolean,
    cast: (value: any) => any | null,
    next: Array<OpType>,
}

export interface Position {
    line: Number,
    column: Number,
}

export interface Token {
    type: OpType,
    value: Number | String | null,
    position: Position,
}