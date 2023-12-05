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
    calculator.printDigit('7');
    calculator.printDigit('7');
    expect(calculator.dashboard.value).toBe('77');
  });

  it('printDigit should to be call in calculator.paste', () => {
    const onSpy = jest.spyOn(calculator, 'printDigit');
    calculator.paste()
    expect(onSpy).toHaveBeenCalled();
  });

  it('printAction should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('toggleTheme should switch between themes', () => {
    let theme = localStorage.getItem('theme');
    if (theme === 'theme-second') {
      calculator.toggleTheme();
      expect(localStorage.getItem('theme')).toBe('theme-second');
    } else if (theme === 'theme-one') {
      calculator.toggleTheme();
      expect(localStorage.getItem('theme')).toBe('theme-one');
    }

  });

  it('clr should clear the dashboard value', () => {
    calculator.printDigit('8');
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });

  it('solve should evaluate and update dashboard value', () => {
    calculator.clr();
    calculator.printDigit('6');
    calculator.printAction('*');
    calculator.printDigit('5');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('30');

  });

  it('solve should evaluate and update dashboard value', () => {
    calculator.clr();
    calculator.printDigit('7');
    calculator.printAction('+');
    calculator.printDigit('6');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('13');
  });

  it('printAction should update dashboard value correctly', () => {
    calculator.clr();
    calculator.printDigit('4');
    calculator.printAction('-');
    calculator.printDigit('2');
    expect(calculator.dashboard.value).toBe('4-2');
  });

  it('printAction should not add action if last character is already an action', () => {
    calculator.clr();
    calculator.printDigit('8');
    calculator.printAction('-');
    calculator.printAction('*');
    expect(calculator.dashboard.value).toBe('8-');
  });

  it('solve should evaluate and update dashboard value', () => {
    calculator.clr();
    calculator.printDigit('15');
    calculator.printAction('/');
    calculator.printDigit('3');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('5');

  });

});
