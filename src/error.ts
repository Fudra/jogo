import OpType from './operations';
import { Rule, Token } from './interfaces'
import { findRuleByToken } from './tokenzier';

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

export const errorWrongNextToken = (tokens: Array<Token>, rules: Array<Rule>) => {

    for (const [index, value] of tokens.entries()) {
        const findRule = findRuleByToken(value, rules);
    }
} 