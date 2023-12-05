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
    calculator.clr();
  });

  it('printAction should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });
  it('solve should evaluate and update dashboard value', () => {
    
    calculator.printDigit('4');
    calculator.printAction('*');
    expect(calculator.dashboard.value).toBe('4*');
    calculator.clr();
    
  });

  it('printAction should not add action if last character is already an action', () => {
    calculator.clr();
    calculator.printDigit('1');
    calculator.printAction('-');
    calculator.printAction('*');
    expect(calculator.dashboard.value).toBe('1-');
    calculator.clr();
  });

  it('printAction should update dashboard value correctly', () => {
    calculator.clr();
    calculator.printDigit('9');
    calculator.printAction('-');
    calculator.printDigit('8');
    expect(calculator.dashboard.value).toBe('9-8');
    calculator.clr();
  });

  it('solve should evaluate and update dashboard value', () => {
    calculator.printDigit('7');
    calculator.printAction('+');
    calculator.printDigit('1');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('8');
    calculator.clr();
  });
});


