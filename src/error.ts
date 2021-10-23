import OpType from './operations';
import { Token } from './interfaces'

export const linePositionError = (token: Token): string => {
    return `@ Ln: ${token.position.line}, Col: ${token.position.column}`
}

export const errorOpUnknow = (tokens: Array<Token>) => {
    for (const token of tokens) {
        if (token.type === OpType.OP_UNKNOW) {
            throw new Error(
                `Unknown Operation "${token.value}" ${linePositionError(token)}`
            );
        }
    }
}