import {Calculator} from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator;
  beforeAll(() => {
    let inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard'
    inputResult.className = "app-result";

    calculator = new Calculator()
    calculator.dashboard = inputResult;
  });

  it('printDigit should to be defined', () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it('printDigit should add new value', () => {
    calculator.printDigit('5');
    calculator.printDigit('5');
    expect(calculator.dashboard.value).toBe('55');
  });

  it("printDigit should to be call in calculator.paste", () => {
    localStorage.setItem("result", "123");
    const onSpy = jest.spyOn(calculator, "printDigit");
    calculator.paste();
    expect(onSpy).toHaveBeenCalledTimes(3); // Очікуємо, що printDigit викликано для кожного символу
  });

  it('printAction should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  describe('solve method', () => {
    it('should correctly evaluate a valid expression', () => {
      calculator.dashboard.value = '3+2';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('5');
    });
    it('should handle long expressions with multiple operators', () => {
      calculator.dashboard.value = '2+3*4-5/2';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('11.5');
    });
    it('should handle division by zero', () => {
      calculator.dashboard.value = '5/0';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('Infinity'); // або інша очікувана поведінка
    });
  });

  describe('printAction method', () => {
    it('should append an operator to the current expression', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('+');
      expect(calculator.dashboard.value).toBe('5+');
    });
    it('should not change the expression for consecutive operators', () => {
      calculator.dashboard.value = '12+';
      calculator.printAction('*');
      expect(calculator.dashboard.value).toBe('12+');
    });
    it('should change the sign of the number', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('-5');
    });
  });

  describe('clr method', () => {
    it('should clear the dashboard', () => {
      calculator.dashboard.value = '5+5';
      calculator.clr();
      expect(calculator.dashboard.value).toBe('');
    });
  });

  describe('Theme methods', () => {
    it('setTheme should set the theme', () => {
      calculator.setTheme('theme-second');
      expect(document.body.className).toBe('theme-second');
    });

    it('toggleTheme should toggle the theme', () => {
      jest.useFakeTimers();
      calculator.setTheme('theme-one');
      calculator.toggleTheme();
      jest.runAllTimers();
      expect(document.body.className).toBe('theme-second');
    });
  });

  describe('Save and Paste methods', () => {
    it('save should save the current value', () => {
      calculator.dashboard.value = '5';
      calculator.save();
      expect(localStorage.getItem('result')).toBe('5');
    });

    it("paste should retrieve the saved value", () => {
      calculator.dashboard.value = ""; // Переконання, що dashboard.value порожнє перед вставкою
      localStorage.setItem("result", "456");
      calculator.paste();
      expect(calculator.dashboard.value).toBe("456");
    });
  });
});




