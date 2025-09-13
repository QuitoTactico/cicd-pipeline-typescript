import { Calculator } from '../src/calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should add positive and negative numbers correctly', () => {
      expect(calculator.add(-1, 1)).toBe(0);
    });

    it('should add two negative numbers correctly', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('should add zero correctly', () => {
      expect(calculator.add(0, 0)).toBe(0);
      expect(calculator.add(5, 0)).toBe(5);
      expect(calculator.add(0, 5)).toBe(5);
    });

    it('should handle decimal numbers', () => {
      expect(calculator.add(1.5, 2.3)).toBeCloseTo(3.8);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      expect(calculator.subtract(5, 2)).toBe(3);
    });

    it('should subtract negative numbers correctly', () => {
      expect(calculator.subtract(1, -1)).toBe(2);
      expect(calculator.subtract(-1, -1)).toBe(0);
    });

    it('should subtract zero correctly', () => {
      expect(calculator.subtract(0, 0)).toBe(0);
      expect(calculator.subtract(5, 0)).toBe(5);
      expect(calculator.subtract(0, 5)).toBe(-5);
    });

    it('should handle decimal numbers', () => {
      expect(calculator.subtract(5.7, 2.2)).toBeCloseTo(3.5);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    it('should multiply negative numbers correctly', () => {
      expect(calculator.multiply(-1, 5)).toBe(-5);
      expect(calculator.multiply(-2, -3)).toBe(6);
    });

    it('should multiply by zero correctly', () => {
      expect(calculator.multiply(0, 10)).toBe(0);
      expect(calculator.multiply(10, 0)).toBe(0);
    });

    it('should multiply by one correctly', () => {
      expect(calculator.multiply(1, 5)).toBe(5);
      expect(calculator.multiply(5, 1)).toBe(5);
    });

    it('should handle decimal numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBeCloseTo(10);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should divide negative numbers correctly', () => {
      expect(calculator.divide(5, -1)).toBe(-5);
      expect(calculator.divide(-10, -2)).toBe(5);
    });

    it('should divide by one correctly', () => {
      expect(calculator.divide(5, 1)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(1, 3)).toBeCloseTo(0.333333, 5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(1, 0)).toThrow('No se puede dividir por cero');
      expect(() => calculator.divide(0, 0)).toThrow('No se puede dividir por cero');
      expect(() => calculator.divide(-5, 0)).toThrow('No se puede dividir por cero');
    });

    it('should allow dividing zero by non-zero number', () => {
      expect(calculator.divide(0, 5)).toBeCloseTo(0);
      expect(calculator.divide(0, -3)).toBeCloseTo(0);
    });
  });
});