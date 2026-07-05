export class DivideByZeroError extends Error {
  constructor() {
    super("Cannot divide by zero.");
    this.name = "DivideByZeroError";
  }
}

export function divideTwoNumbers(num1: number, num2: number): number {
  if (num2 === 0) {
    throw new DivideByZeroError();
  }

  return num1 / num2;
}
