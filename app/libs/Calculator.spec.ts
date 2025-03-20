import {Calculator} from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator = null;
  beforeEach(() => {
    let inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard'
    inputResult.className = "app-result";

    calculator = new Calculator()
    calculator.dashboard = inputResult;

    localStorage.clear()
  });

  it('printDigit() should to be defined', () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it('printDigit() should add new value', () => {
    calculator.printDigit('5');
    calculator.printDigit('5');
    expect(calculator.dashboard.value).toBe('55');
  });

  it('printDigit() should to be call in calculator.paste', () => {
    const onSpy = jest.spyOn(calculator, 'printDigit');
    calculator.paste()
    expect(onSpy).toHaveBeenCalled();
  });

  it('printAction() should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('printAction() must add valid operator', () => {
    calculator.printDigit('1');
    calculator.printAction('-');
    expect(calculator.dashboard.value).toBe('1-');
  });

  it('printAction() must not add an operator if it already presentet', () => {
    calculator.printDigit('25');
    calculator.printAction('-');
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('25-');
  });

  it('printAction() must not add an operator to the empty field', () => {
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('');
  });

  it('printAction() +/- must work correctly', () => {
    calculator.printDigit('3');
    expect(calculator.dashboard.value).toBe('3');
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('-3');
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('3');
  });

  it('solve() must solve the expression', () => {
    calculator.printDigit('3');
    calculator.printAction('+');
    calculator.printDigit('3');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('6');
  });

  it('solve() must not fall after error', () => {
    calculator.dashboard.value = "error"
    calculator.printAction('+');
    calculator.printDigit('3');
    calculator.solve();
    expect(calculator.dashboard.value).toBe(calculator.INVALID_OPERATION);
  });

  it('clr() must clear', () => {
    calculator.printDigit('3333');
    expect(calculator.dashboard.value).toBe('3333');
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });

  it('setTheme() must set correct theme', () => {
    calculator.setTheme('theme-second');
    expect(localStorage.getItem('theme')).toBe('theme-second');
    expect(document.querySelector('body').className).toBe('theme-second');
  });

  it('toggleTheme() should switch themes correctly', () => {
    calculator.setTheme('theme-one');
    calculator.toggleTheme();

    expect(localStorage.getItem('theme')).toBe('theme-second');
    expect(document.querySelector('body').className).toBe('theme-second');

    calculator.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('theme-one');
    expect(document.querySelector('body').className).toBe('theme-one');
  });

  it('save() must save input in LS', () => {
    calculator.printDigit("255")
    calculator.save();
    expect(localStorage.getItem('result')).toBe('255');
  });

  it('paste() must paste after savind', () => {
    calculator.printDigit("255")
    calculator.save();
    expect(localStorage.getItem('result')).toBe('255');

    calculator.clr()
    expect(calculator.dashboard.value).toBe('');
    calculator.paste();
    expect(calculator.dashboard.value).toBe('255');
  });
});
