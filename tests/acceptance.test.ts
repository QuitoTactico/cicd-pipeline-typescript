import { Builder, By, WebDriver, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const { Select } = require('selenium-webdriver/lib/select');

const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:8000';
jest.setTimeout(30000); // 30 segundos para todos los tests y hooks
describe('Calculator Acceptance Tests', () => {
  let driver: WebDriver;

  beforeAll(async () => {

    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    // Espera a que la app esté arriba
    let connected = false;
    for (let i = 0; i < 10; i++) {
      try {
        await driver.get(BASE_URL);
        connected = true;
        break;
      } catch {
        await new Promise(res => setTimeout(res, 1000));
      }
    }
    if (!connected) throw new Error('No se pudo conectar a la app');
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async () => {
    await driver.get(BASE_URL);
  });

  const fillFormAndSubmit = async (num1: string, num2: string, operation: string): Promise<void> => {
    await driver.wait(until.elementLocated(By.id('num1')), 10000);
    
    const num1Input = await driver.findElement(By.id('num1'));
    const num2Input = await driver.findElement(By.id('num2'));
    const operationSelect = await driver.findElement(By.id('operation'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await num1Input.clear();
    await num1Input.sendKeys(num1);
    
    await num2Input.clear();
    await num2Input.sendKeys(num2);
    
    const select = new Select(operationSelect);
    await select.selectByValue(operation);
    await submitButton.click();
  };

  const getResult = async (): Promise<string> => {
    await driver.wait(until.elementLocated(By.id('result')), 10000);
    const resultElement = await driver.findElement(By.id('result'));
    await driver.wait(until.elementIsVisible(resultElement), 5000);
    return await resultElement.getText();
  };

  describe('Basic Calculator Operations', () => {
    it('should perform addition correctly', async () => {
      await fillFormAndSubmit('2', '3', 'add');
      const result = await getResult();
      expect(result).toContain('Resultado: 5');
    });

    it('should perform subtraction correctly', async () => {
      await fillFormAndSubmit('5', '2', 'subtract');
      const result = await getResult();
      expect(result).toContain('Resultado: 3');
    });

    it('should perform multiplication correctly', async () => {
      await fillFormAndSubmit('4', '6', 'multiply');
      const result = await getResult();
      expect(result).toContain('Resultado: 24');
    });

    it('should perform division correctly', async () => {
      await fillFormAndSubmit('10', '2', 'divide');
      const result = await getResult();
      expect(result).toContain('Resultado: 5');
    });
  });

  describe('Error Handling', () => {
    it('should handle division by zero', async () => {
      await fillFormAndSubmit('5', '0', 'divide');
      const result = await getResult();
      expect(result).toContain('Error: No se puede dividir por cero');
    });

    it('should handle invalid numbers', async () => {
      await fillFormAndSubmit('abc', 'def', 'add');
      const result = await getResult();
      expect(result).toContain('Error: Introduce números válidos');
    });
  });

  describe('Decimal Numbers', () => {
    it('should handle decimal inputs correctly', async () => {
      await fillFormAndSubmit('1.5', '2.5', 'add');
      const result = await getResult();
      expect(result).toContain('Resultado: 4');
    });

    it('should handle decimal division results', async () => {
      await fillFormAndSubmit('1', '3', 'divide');
      const result = await getResult();
      expect(result).toContain('Resultado: 0.3333333333333333');
    });
  });

  describe('Negative Numbers', () => {
    it('should handle negative numbers in addition', async () => {
      await fillFormAndSubmit('-2', '5', 'add');
      const result = await getResult();
      expect(result).toContain('Resultado: 3');
    });

    it('should handle negative numbers in subtraction', async () => {
      await fillFormAndSubmit('2', '-3', 'subtract');
      const result = await getResult();
      expect(result).toContain('Resultado: 5');
    });

    it('should handle negative numbers in multiplication', async () => {
      await fillFormAndSubmit('-2', '3', 'multiply');
      const result = await getResult();
      expect(result).toContain('Resultado: -6');
    });
  });

  describe('User Interface', () => {
    it('should display the calculator title', async () => {
      const title = await driver.getTitle();
      expect(title).toBe('Calculadora TypeScript');
    });

    it('should have all required form elements', async () => {
      const num1Input = await driver.findElement(By.id('num1'));
      const num2Input = await driver.findElement(By.id('num2'));
      const operationSelect = await driver.findElement(By.id('operation'));
      const submitButton = await driver.findElement(By.css('button[type="submit"]'));

      expect(await num1Input.isDisplayed()).toBe(true);
      expect(await num2Input.isDisplayed()).toBe(true);
      expect(await operationSelect.isDisplayed()).toBe(true);
      expect(await submitButton.isDisplayed()).toBe(true);
    });

    it('should have correct operation options', async () => {
      const operationSelect = await driver.findElement(By.id('operation'));
      const options = await operationSelect.findElements(By.tagName('option'));
      
      expect(options.length).toBe(4);
      
      const optionTexts = await Promise.all(
        options.map(option => option.getText())
      );
      
      expect(optionTexts).toContain('Sumar (+)');
      expect(optionTexts).toContain('Restar (-)');
      expect(optionTexts).toContain('Multiplicar (×)');
      expect(optionTexts).toContain('Dividir (÷)');
    });
  });
});