import assert from "node:assert/strict"
import { evaluateCalculatorExpression } from "./basic-scientific-calculator"

function closeTo(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} should be close to ${expected}`)
}

assert.equal(evaluateCalculatorExpression("2+3*4", "DEG"), 14)
assert.equal(evaluateCalculatorExpression("(2+3)^2", "DEG"), 25)
assert.equal(evaluateCalculatorExpression("50%", "DEG"), 0.5)
assert.equal(evaluateCalculatorExpression("sqrt(81)", "DEG"), 9)
assert.equal(evaluateCalculatorExpression("log(1000)", "DEG"), 3)
assert.equal(evaluateCalculatorExpression("ln(e)", "DEG"), 1)

closeTo(evaluateCalculatorExpression("sin(30)", "DEG"), 0.5)
closeTo(evaluateCalculatorExpression("cos(60)", "DEG"), 0.5)
closeTo(evaluateCalculatorExpression("tan(45)", "DEG"), 1)
closeTo(evaluateCalculatorExpression("sin(pi/2)", "RAD"), 1)

assert.throws(() => evaluateCalculatorExpression("sin()", "DEG"), /Invalid expression/)
assert.throws(() => evaluateCalculatorExpression("2+", "DEG"), /Invalid expression/)
