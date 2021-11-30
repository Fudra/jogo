import OpType from './operations';
import { Rule } from './interfaces'
import { castValueToString } from './helper';

const rules: Array<Rule> = [
    {
        type: OpType.OP_COMMENT,
        check: (value) => castValueToString(value)[0] === '#',
        cast: (value) => value,
        next: [],
    },
    {
        type: OpType.OP_FORWARD,
        check: (value) => ['fd', 'forward'].includes(castValueToString(value)),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_BACKWARD,
        check: (value) => ['bk', 'backward'].includes(castValueToString(value)),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_LEFT,
        check: (value) => ['lt', 'left'].includes(castValueToString(value)),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_RIGHT,
        check: (value) => ['rt', 'right'].includes(castValueToString(value)),
        cast: () => null,
        next: [OpType.OP_NUMBER],
    },
    {
        type: OpType.OP_NUMBER,
        check: (value) => Number.isInteger(+castValueToString(value)),
        cast: (value) => +value,
        next: [],
    },
    // should be the last rule  
    {
        type: OpType.OP_UNKNOW,
        check: () => true,
        cast: (value) => value,
        next: [],
    },
]

export default rules;