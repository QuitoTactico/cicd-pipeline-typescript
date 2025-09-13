export class Calculator {
  /**
   * Suma dos números
   * @param a Primer número
   * @param b Segundo número
   * @returns Resultado de la suma
   */
  public add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Resta dos números
   * @param a Primer número
   * @param b Segundo número
   * @returns Resultado de la resta
   */
  public subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplica dos números
   * @param a Primer número
   * @param b Segundo número
   * @returns Resultado de la multiplicación
   */
  public multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide dos números
   * @param a Dividendo
   * @param b Divisor
   * @returns Resultado de la división
   * @throws Error si se intenta dividir por cero
   */
  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('No se puede dividir por cero');
    }
    return a / b;
  }
}

// Exportar una instancia por defecto
export const calculator = new Calculator();
