import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
  describe('GET /', () => {
    it('should return the HTML page', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.type).toBe('text/html');
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toContain('Calculadora TypeScript');
    });
  });

  describe('POST /calculate', () => {
    it('should perform addition correctly', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '2',
          num2: '3',
          operation: 'add'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: '5'
      });
    });

    it('should perform subtraction correctly', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '5',
          num2: '3',
          operation: 'subtract'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: '2'
      });
    });

    it('should perform multiplication correctly', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '2',
          num2: '3',
          operation: 'multiply'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: '6'
      });
    });

    it('should perform division correctly', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '6',
          num2: '3',
          operation: 'divide'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: '2'
      });
    });

    it('should handle division by zero', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '6',
          num2: '0',
          operation: 'divide'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: false,
        result: 'Error: No se puede dividir por cero'
      });
    });

    it('should handle invalid numbers', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: 'abc',
          num2: 'def',
          operation: 'add'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: false,
        result: 'Error: Introduce números válidos'
      });
    });

    it('should handle invalid operation', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '6',
          num2: '3',
          operation: 'invalid'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: false,
        result: 'Operación no válida'
      });
    });

    it('should handle missing parameters', async () => {
      const response = await request(app)
        .post('/calculate')
        .send({
          num1: '6',
          operation: 'add'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(false);
    });
  });
});