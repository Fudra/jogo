import OpType from './operations';
import { Token } from './interfaces'

export const errorOpUnknow = (tokens: Array<Token>) => {
    for (const token of tokens) {
        if (token.type === OpType.OP_UNKNOW) {
            throw new Error(
                `Unknown Operation "${token.value}" at Ln: ${token.position.line}, Col: ${token.position.column}`
            );
        }
    }
}