# JOGO

JOGO is a tokenzier and parser for the LOGO (also known as [Turtle Graphics](https://en.wikipedia.org/wiki/Turtle_graphics)) Programming Languange. Its main purpose is to parse and tokenzie a logo language file. The tokenization can be parsed to another program, that handles the display for the steps of the turtle. The name JOGO is derived from the words <b>J</b>avaScript and  L<b>OGO</b>. 


## Usage

```js

import Jogo from 'jogo';

const script = "FD 100 LT 90 FD 100";

const jogo = new Jogo();

jogo.parse(script);



```

## Instalation
`todo`

## Test
`npm run test`

## Coverage
`npm run coverage`

## Roadmap

 * [x] Tokenize Movement (FD, BD, LT, RT)
 * [x] Tokenize & Parse Numbers
 * [x] Tokenize Comments
 * [ ] Tokenize Loops
 * [ ] Support basic Arithmetics
 * [ ] Tokenize functions
 * [ ] Add variable support
 * [ ] Add variables to functions
 * [ ] Add color tokens
 * [ ] Add constant tokenization like SIN, COS, PI, E, etc.
 * [ ] Add tokens for Clean Screen, Reset, Pen Up, Pen Down and Back to Center.


 # Inspiration

The main inspiration and the ruleset is based on this german lecture material [Logo Heft](https://abz.inf.ethz.ch/wp-content/uploads/unterrichtsmaterialien/primarschulen/logo_heft_de.pdf) and [Logo Cheatsheet](https://xlogo.inf.ethz.ch/Cheatsheet.pdf).


# License
This project is unter the [MIT](./LICENSE.md) license. 
 