enum Operation {
    OP_COMMENT,
    OP_FORWARD,
    OP_BACKWARD,
    OP_LEFT,
    OP_RIGHT,
    OP_NUMBER,
    OP_REPEAT,
    OP_SQUARE_BRACKET_OPEN,
    OP_SQUARE_BRACKET_CLOSE,

    /**
     * An unknow operation should occure, 
     * if none of the above match
     */
    OP_UNKNOW,

    /**
     * the should expect operation is used,
     * when the next op in the next array 
     * is mandatory but not expeted as
     * the subsequent operation.
     * 
     * ie. a close bracket is expected
     * but with an undefined number
     * of operations in between.
     */
    OP_SHOULD_EXPECT,


    /**
     * the optional operation is used,
     * to indicate that the next
     * operation in is optional.
     * 
     * ie. a function can have an 
     * optional parameter.
     */
    OP_OPTIONAL,
}

export default Operation;