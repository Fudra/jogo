import OpType from './operations';
import { Rule } from './interfaces'

const rules: Array<Rule> = [
    {
        type: OpType.OP_COMMENT,
        check: (value) => value[0] === '#',
        cast: (value) => value,
        next: [],
    },
    {
        type: OpType.OP_FORWARD,
        check: (value) => ['fd', 'forward'].includes(value),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_BACKWARD,
        check: (value) => ['bk', 'backward'].includes(value),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_LEFT,
        check: (value) => ['lt', 'left'].includes(value),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_RIGHT,
        check: (value) => ['rt', 'right'].includes(value),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_NUMBER,
        check: (value) => Number.isInteger(+value),
        cast: (value) => +value,
        next: [],
    },
    {
        type: OpType.OP_UNKNOW,
        check: () => true,
        cast: (value) => value,
        next: [],
    },
]

export default rules;