import rules from '../rules';
import OpType from './../operations';

describe('rules', () => {
    test('a comment is parse as an operation comment ', () => {
        const comment = '# a test comment';
        const rule = rules.find((rule) => rule.check(comment));
        expect(rule?.type).toBe(OpType.OP_COMMENT)
    })

    test('a fd movement is parse as an operation forward', () => {
        const move = 'fd';
        const rule = rules.find((rule) => rule.check(move));
        expect(rule?.type).toBe(OpType.OP_FORWARD)
    })


    test('a forward movement is parse as an operation forward', () => {
        const move = 'forward';
        const rule = rules.find((rule) => rule.check(move));
        expect(rule?.type).toBe(OpType.OP_FORWARD)
    })

    test('a bk movement is parse as an operation backwords', () => {
        const move = 'bk';
        const rule = rules.find((rule) => rule.check(move));
        expect(rule?.type).toBe(OpType.OP_BACKWARD)
    })

    test('a backward movement is parse as an operation backwords', () => {
        const move = 'backward';
        const rule = rules.find((rule) => rule.check(move));
        expect(rule?.type).toBe(OpType.OP_BACKWARD)
    })

    test('a lt turn is parse as an operation left', () => {
        const turn = 'lt';
        const rule = rules.find((rule) => rule.check(turn));
        expect(rule?.type).toBe(OpType.OP_LEFT)
    })

    test('a left turn is parse as an operation left', () => {
        const turn = 'left';
        const rule = rules.find((rule) => rule.check(turn));
        expect(rule?.type).toBe(OpType.OP_LEFT)
    })

    test('a rt turn is parse as an operation left', () => {
        const turn = 'rt';
        const rule = rules.find((rule) => rule.check(turn));
        expect(rule?.type).toBe(OpType.OP_RIGHT)
    })

    test('a right turn is parse as an operation left', () => {
        const turn = 'right';
        const rule = rules.find((rule) => rule.check(turn));
        expect(rule?.type).toBe(OpType.OP_RIGHT)
    })


    test('a number is parse as an operation number', () => {
        const op = '90';
        const rule = rules.find((rule) => rule.check(op));
        expect(rule?.type).toBe(OpType.OP_NUMBER)
    })

    test('a random string is parse as an operation unkown', () => {
        const op = 'lorem';
        const rule = rules.find((rule) => rule.check(op));
        expect(rule?.type).toBe(OpType.OP_UNKNOW)
    })

    test('a number string is cast by the rule to a number', () => {
        const rule = rules.find((rule) => rule.type === OpType.OP_NUMBER);
        const cast = rule?.cast('90');
        expect(cast).toBe(90)
    })


    test('a comment string is not change by the rule caster', () => {
        const comment = "# this is a comment "
        const rule = rules.find((rule) => rule.type === OpType.OP_COMMENT);
        const cast = rule?.cast(comment);
        expect(cast).toBe(comment)
    })


    test('the next expect token by a movement is a number', () => {
        const fdRule = rules.find((rule) => rule.type === OpType.OP_FORWARD);
        expect(fdRule?.next).toContain(OpType.OP_NUMBER);
        expect(fdRule?.next).toHaveLength(1);

        const bkRule = rules.find((rule) => rule.type === OpType.OP_BACKWARD);
        expect(bkRule?.next).toContain(OpType.OP_NUMBER);
        expect(bkRule?.next).toHaveLength(1);
    })


    test('the next expect token by a trun is a number', () => {
        const rtRule = rules.find((rule) => rule.type === OpType.OP_LEFT);
        expect(rtRule?.next).toContain(OpType.OP_NUMBER);
        expect(rtRule?.next).toHaveLength(1);

        const ltRule = rules.find((rule) => rule.type === OpType.OP_RIGHT);
        expect(ltRule?.next).toContain(OpType.OP_NUMBER);
        expect(ltRule?.next).toHaveLength(1);
    })

})