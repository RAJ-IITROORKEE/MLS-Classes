export type CalculatorAngleMode = "DEG" | "RAD"

class ExpressionParser {
  private position = 0

  constructor(
    private readonly input: string,
    private readonly angleMode: CalculatorAngleMode
  ) {}

  parse() {
    const value = this.parseExpression()
    this.skipWhitespace()

    if (this.position < this.input.length || !Number.isFinite(value)) {
      throw new Error("Invalid expression")
    }

    return value
  }

  private parseExpression(): number {
    let value = this.parseTerm()

    while (true) {
      this.skipWhitespace()

      if (this.match("+")) {
        value += this.parseTerm()
      } else if (this.match("-")) {
        value -= this.parseTerm()
      } else {
        return value
      }
    }
  }

  private parseTerm(): number {
    let value = this.parsePower()

    while (true) {
      this.skipWhitespace()

      if (this.match("*")) {
        value *= this.parsePower()
      } else if (this.match("/")) {
        value /= this.parsePower()
      } else {
        return value
      }
    }
  }

  private parsePower(): number {
    const value = this.parseUnary()

    this.skipWhitespace()
    if (this.match("^")) {
      return value ** this.parsePower()
    }

    return value
  }

  private parseUnary(): number {
    this.skipWhitespace()


    if (this.match("+")) return this.parseUnary()
    if (this.match("-")) return -this.parseUnary()

    return this.parsePostfix()
  }

  private parsePostfix(): number {
    let value = this.parsePrimary()

    while (true) {
      this.skipWhitespace()
      if (!this.match("%")) return value
      value /= 100
    }
  }

  private parsePrimary(): number {
    this.skipWhitespace()

    if (this.match("(")) {
      const value = this.parseExpression()
      if (!this.match(")")) throw new Error("Invalid expression")
      return value
    }

    const number = this.parseNumber()
    if (number !== null) return number

    const identifier = this.parseIdentifier()
    if (!identifier) throw new Error("Invalid expression")

    if (identifier === "pi") return Math.PI
    if (identifier === "e") return Math.E

    if (!this.match("(")) throw new Error("Invalid expression")
    const value = this.parseExpression()
    if (!this.match(")")) throw new Error("Invalid expression")

    return this.applyFunction(identifier, value)
  }

  private parseNumber(): number | null {
    this.skipWhitespace()

    const start = this.position
    let hasDigit = false
    let hasDecimal = false

    while (this.position < this.input.length) {
      const char = this.input[this.position]

      if (char >= "0" && char <= "9") {
        hasDigit = true
        this.position++
      } else if (char === "." && !hasDecimal) {
        hasDecimal = true
        this.position++
      } else {
        break
      }
    }

    if (!hasDigit) {
      this.position = start
      return null
    }

    return Number(this.input.slice(start, this.position))
  }

  private parseIdentifier(): string | null {
    this.skipWhitespace()

    const start = this.position
    while (this.position < this.input.length) {
      const char = this.input[this.position]
      if ((char >= "a" && char <= "z") || char === "π") {
        this.position++
      } else {
        break
      }
    }

    if (start === this.position) return null

    return this.input.slice(start, this.position).replace("π", "pi")
  }

  private applyFunction(name: string, value: number): number {
    const radians = this.angleMode === "DEG" ? (value * Math.PI) / 180 : value

    switch (name) {
      case "sin":
        return Math.sin(radians)
      case "cos":
        return Math.cos(radians)
      case "tan":
        return Math.tan(radians)
      case "asin": {
        const result = Math.asin(value)
        return this.angleMode === "DEG" ? (result * 180) / Math.PI : result
      }
      case "acos": {
        const result = Math.acos(value)
        return this.angleMode === "DEG" ? (result * 180) / Math.PI : result
      }
      case "atan": {
        const result = Math.atan(value)
        return this.angleMode === "DEG" ? (result * 180) / Math.PI : result
      }
      case "sqrt":
        return Math.sqrt(value)
      case "log":
        return Math.log10(value)
      case "ln":
        return Math.log(value)
      case "abs":
        return Math.abs(value)
      default:
        throw new Error("Invalid expression")
    }
  }

  private match(expected: string) {
    this.skipWhitespace()

    if (this.input[this.position] !== expected) return false

    this.position++
    return true
  }

  private skipWhitespace() {
    while (/\s/.test(this.input[this.position] ?? "")) {
      this.position++
    }
  }
}

export function evaluateCalculatorExpression(
  expression: string,
  angleMode: CalculatorAngleMode
) {
  const normalized = expression
    .toLowerCase()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .trim()

  if (!normalized) throw new Error("Invalid expression")

  return new ExpressionParser(normalized, angleMode).parse()
}

export function formatCalculatorResult(value: number) {
  const rounded = Math.abs(value) < 1e-12 ? 0 : value

  if (!Number.isFinite(rounded)) throw new Error("Invalid expression")
  if (Number.isInteger(rounded)) return String(rounded)

  return Number(rounded.toPrecision(12)).toString()
}
