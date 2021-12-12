import Jogo from "../main"

//const TEST_SCRIPT = "F 100 LT 90 FD 100";


describe('program', () => {
    it('can init a new instance ', () => {
        const jogo = new Jogo;

        jogo.parse("fd FD");
        console.log(jogo.program);

        // expect(jogo.program).toEqual(expect.arrayContaining())
    })
})