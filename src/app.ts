import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { calculator } from './calculator';

const app = express();
app.disable('x-powered-by');
// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // o el dominio de tu frontend en producción
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Interfaz para las operaciones de la calculadora
interface CalculationRequest {
  num1: string;
  num2: string;
  operation: string;
}

// Ruta principal - servir el HTML
app.get('/', (res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta para procesar cálculos
app.post('/calculate', (req: Request, res: Response) => {
  try {
    const { num1, num2, operation }: CalculationRequest = req.body;

    // Validar entrada
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      return res.json({
        success: false,
        result: 'Error: Introduce números válidos',
      });
    }

    let result: number | undefined;
    let responseSent = false;

    switch (operation) {
      case 'add':
        result = calculator.add(number1, number2);
        break;
      case 'subtract':
        result = calculator.subtract(number1, number2);
        break;
      case 'multiply':
        result = calculator.multiply(number1, number2);
        break;
      case 'divide':
        try {
          result = calculator.divide(number1, number2);
        } catch (error) {
          responseSent = true;
          return res.json({
            success: false,
            result: 'Error: No se puede dividir por cero',
          });
        }
        break;
      default:
        responseSent = true;
        return res.json({
          success: false,
          result: 'Operación no válida',
        });
    }

    if (!responseSent && result !== undefined) {
      return res.json({
        success: true,
        result: result.toString(),
      });
    }
    return res.json({
      success: false,
      result: 'Error desconocido',
    });
  } catch (error) {
    return res.json({
      success: false,
      result: 'Error interno del servidor',
    });
  }
});

export default app;
