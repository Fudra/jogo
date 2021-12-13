import * as error from './error';
import * as rules from './rules';
import * as helper from './helper';
import * as tokenizer from './tokenizer';
import * as interfaces from './interfaces';
import * as operations from './operations';

export default class Jogo {
    #program: Array<interfaces.Token>;
    #rules: Array<interfaces.Rule>

    /**
     * 
     */
    constructor() {
        this.#program = [];
        this.#rules = rules.default;
    }

    /**
     *  @var rule  Array<interfaces.Rule>
     */
    set rules(rules: Array<interfaces.Rule>) {
        this.#rules = rules;
    }

    /**
     * 
     * @returns Array<interfaces.Rule>
     */
    get rules(): Array<interfaces.Rule> {
        return this.#rules;
    }

    /**
     * 
     * @returns Array<interfaces.Token>
     */
    get program(): Array<interfaces.Token> {
        return this.#program;
    }

    /**
     * 
     * @param src string
     * @returns void
     */
    parse(src: string): void {
        this.#program = tokenizer.default(src, this.#rules)
    }
}



export {
    error,
    helper,
    interfaces,
    operations,
    rules,
    tokenizer,
}

