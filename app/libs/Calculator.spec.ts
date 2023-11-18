import { Calculator } from './Calculator';
 

describe('Тестовий набір для Calculator.ts', () => {
  let calculator;

  beforeAll(() => {
    let inputResult = document.createElement('input');
    inputResult.type = 'text';
    inputResult.id = 'dashboard';
    inputResult.className = 'app-result';

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  it('printDigit повинна бути визначена', () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it('printDigit повинна додавати нове значення', () => {
    calculator.printDigit('5');
    calculator.printDigit('5');
    expect(calculator.dashboard.value).toBe('55');
  });

  it('printDigit повинна бути викликана в calculator.paste', () => {
    const onSpy = jest.spyOn(calculator, 'printDigit');
    calculator.paste();
    expect(onSpy).toHaveBeenCalled();
  });

  it('printAction повинна бути визначена', () => {
    expect(calculator.printAction).toBeDefined();
  });

  

  it('clear повинен очищати вміст', () => {
    calculator.printDigit('5');
    calculator.clear();
    expect(calculator.dashboard.value).toBe('');
  
  });

  

  it('clear повинен скидувати всі операції', () => {
    // Встановлюємо початкове значення на дашборді
    calculator.dashboard.value = '3=';
  
    // Викликаємо метод clear
    calculator.clear();
  
    // Очікуємо, що значення буде змінено на порожню строку
    expect(calculator.dashboard.value).toBe('');
  });
  
  it('clear повинен скидувати всі операції', () => {
    // Встановлюємо початкове значення на дашборді
    calculator.dashboard.value = '3=5.3.';
  
    // Виклик методу clear
    calculator.clear();
  
    // Очікуємо, що значення буде очищено
    expect(calculator.dashboard.value).toBe('');
  });

  it('clear повинен очищати вміст', () => {
    calculator.printDigit('5');
    calculator.clear();
    expect(calculator.dashboard.value).toBe('');
  });

 
  it('printPercentage повинен переводити число в відсотки', () => {
    // Встановлюємо початкове значення на дашборді
    calculator.dashboard.value = '50';
  
    // Виклик методу printPercentage
    calculator.printPercentage();
  
    // Очікуємо, що значення буде змінено на "0.5"
    expect(calculator.dashboard.value).toBe('0.5');
    // Очікуємо, що знак числа буде змінений
    calculator.dashboard.value = '50';

    // Виклик методу printPercentage
    calculator.printPercentage();
  
    // Очікуємо, що значення буде змінено на "0.5"
    expect(calculator.dashboard.value).toBe('0.5');
  });
  
  it('clear повинен скидувати всі операції', () => {
    // Встановлюємо початкове значення на дашборді
    calculator.dashboard.value = '3=5.3';
  
    // Виклик методу clear
    calculator.clear();
  
    // Очікуємо, що значення буде очищено
    expect(calculator.dashboard.value).toBe('');
  
  });
});

