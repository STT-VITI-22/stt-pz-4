import { Calculator } from './Calculator';

describe('BDD test suite for calculator', () => {
  let calculator;
  let inputResult;
  beforeAll(() => {
    inputResult = document.createElement('input');
    inputResult.type = 'text';
    inputResult.id = 'dashboard';
    inputResult.className = 'app-result';

    calculator = new Calculator()
    calculator.dashboard = inputResult;
  });

  describe('Feature: Print Digits', () => {
    it('should define printDigit method', () => {
      expect(calculator.printDigit).toBeDefined();
    });

    it('should add new digit to dashboard value', () => {
      calculator.clr();
      calculator.printDigit('5');
      calculator.printDigit('3');
      expect(calculator.dashboard.value).toBe('53');
    });
  });

  describe('Feature: Print Actions', () => {
    it('should define printAction method', () => {
      expect(calculator.printAction).toBeDefined();
    });

    it('should add action to dashboard value', () => {
      calculator.clr();
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('3');
      expect(calculator.dashboard.value).toBe('5+3');
    });
  });

  describe('Feature: Paste', () => {
    it('should call printDigit when paste is invoked', () => {
      const spyOnPrintDigit = jest.spyOn(calculator, 'printDigit');
      calculator.paste();
      expect(spyOnPrintDigit).toHaveBeenCalled();
    });
  });

  describe('Feature: clr', () => {
    it('should define clr method', () => {
      expect(calculator.clr).toBeDefined();
    });

    it('should clr the dashboard value', () => {
      calculator.printDigit('5');
      calculator.clr();
      expect(calculator.dashboard.value).toBe('');
    });
  });

  describe('Feature: Calculate', () => {
    it('should define calculate method', () => {
      expect(calculator.solve).toBeDefined();
    });

    it('should evaluate and display the result', () => {
      calculator.clr();
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('3');
      calculator.solve();
      expect(calculator.dashboard.value).toBe('8');
    });

    it('should handle invalid expressions', () => {
      calculator.clr();
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printAction('*');
      calculator.solve();
      expect(calculator.dashboard.value).toBe('Error');
    });
  });

});


