/**
 * Safe arithmetic expression parser
 * Supports: +, -, *, /, parentheses, decimals, unary minus
 * No eval() used
 */

type TokenType =
  | 'NUMBER'
  | 'PLUS'
  | 'MINUS'
  | 'MULTIPLY'
  | 'DIVIDE'
  | 'LPAREN'
  | 'RPAREN'
  | 'EOF';

interface Token {
  type: TokenType;
  value: string;
}

class Lexer {
  private pos: number = 0;
  private input: string;

  constructor(input: string) {
    this.input = input.trim();
  }

  private currentChar(): string | null {
    return this.pos < this.input.length ? this.input[this.pos] : null;
  }

  private advance(): void {
    this.pos++;
  }

  private skipWhitespace(): void {
    while (this.currentChar() === ' ' || this.currentChar() === '\t') {
      this.advance();
    }
  }

  private readNumber(): Token {
    let numStr = '';
    while (
      this.currentChar() !== null &&
      (this.currentChar()! >= '0' && this.currentChar()! <= '9' ||
        this.currentChar() === '.')
    ) {
      numStr += this.currentChar();
      this.advance();
    }
    return { type: 'NUMBER', value: numStr };
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.pos < this.input.length) {
      this.skipWhitespace();
      const ch = this.currentChar();
      if (ch === null) break;

      if ((ch >= '0' && ch <= '9') || ch === '.') {
        tokens.push(this.readNumber());
      } else if (ch === '+') {
        tokens.push({ type: 'PLUS', value: '+' });
        this.advance();
      } else if (ch === '-') {
        tokens.push({ type: 'MINUS', value: '-' });
        this.advance();
      } else if (ch === '*' || ch === '×') {
        tokens.push({ type: 'MULTIPLY', value: '*' });
        this.advance();
      } else if (ch === '/' || ch === '÷') {
        tokens.push({ type: 'DIVIDE', value: '/' });
        this.advance();
      } else if (ch === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        this.advance();
      } else if (ch === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        this.advance();
      } else {
        throw new Error(`Invalid character: ${ch}`);
      }
    }

    tokens.push({ type: 'EOF', value: '' });
    return tokens;
  }
}

class Parser {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private currentToken(): Token {
    return this.tokens[this.pos];
  }

  private eat(type: TokenType): Token {
    const token = this.currentToken();
    if (token.type !== type) {
      throw new Error(`Expected ${type} but got ${token.type}`);
    }
    this.pos++;
    return token;
  }

  // expression: term ((PLUS | MINUS) term)*
  private expression(): number {
    let result = this.term();

    while (
      this.currentToken().type === 'PLUS' ||
      this.currentToken().type === 'MINUS'
    ) {
      if (this.currentToken().type === 'PLUS') {
        this.eat('PLUS');
        result += this.term();
      } else {
        this.eat('MINUS');
        result -= this.term();
      }
    }

    return result;
  }

  // term: unary ((MULTIPLY | DIVIDE) unary)*
  private term(): number {
    let result = this.unary();

    while (
      this.currentToken().type === 'MULTIPLY' ||
      this.currentToken().type === 'DIVIDE'
    ) {
      if (this.currentToken().type === 'MULTIPLY') {
        this.eat('MULTIPLY');
        result *= this.unary();
      } else {
        this.eat('DIVIDE');
        const divisor = this.unary();
        if (divisor === 0) {
          throw new Error('Division by zero');
        }
        result /= divisor;
      }
    }

    return result;
  }

  // unary: (MINUS)? factor
  private unary(): number {
    if (this.currentToken().type === 'MINUS') {
      this.eat('MINUS');
      return -this.factor();
    }
    if (this.currentToken().type === 'PLUS') {
      this.eat('PLUS');
      return this.factor();
    }
    return this.factor();
  }

  // factor: NUMBER | LPAREN expression RPAREN
  private factor(): number {
    const token = this.currentToken();

    if (token.type === 'NUMBER') {
      this.eat('NUMBER');
      const val = parseFloat(token.value);
      if (isNaN(val)) {
        throw new Error(`Invalid number: ${token.value}`);
      }
      return val;
    }

    if (token.type === 'LPAREN') {
      this.eat('LPAREN');
      const result = this.expression();
      this.eat('RPAREN');
      return result;
    }

    throw new Error(`Unexpected token: ${token.type} (${token.value})`);
  }

  parse(): number {
    const result = this.expression();
    if (this.currentToken().type !== 'EOF') {
      throw new Error('Unexpected token after expression');
    }
    return result;
  }
}

export function parseExpression(expression: string): number {
  if (!expression || expression.trim() === '') {
    throw new Error('Empty expression');
  }
  const lexer = new Lexer(expression);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens);
  return parser.parse();
}

export function formatResult(value: number): string {
  if (!isFinite(value)) {
    throw new Error('Result is not finite');
  }
  // Avoid floating point display issues
  const str = parseFloat(value.toPrecision(12)).toString();
  return str;
}
