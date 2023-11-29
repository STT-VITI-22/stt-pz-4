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

  it('printDigit should to be call in calculator.paste', () => {
    const onSpy = jest.spyOn(calculator, 'printDigit');
    calculator.paste();
    expect(onSpy).toHaveBeenCalled();
  });

  it('printAction should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('printAction should add +/-', () => {
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('-55null');
  });

  it('printAction should add *', () => {
    calculator.printAction('*');
    expect(calculator.dashboard.value).toBe('-55null*');
  });

  it('clr should to be defined', () => {
    expect(calculator.clr).toBeDefined();
  });

  it('clr should clear dashboard', () => {
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });

  it('printAction should not add *, -, /, %, . if dashboard empty', () => {
    calculator.printAction('*');
    calculator.printAction('-');
    expect(calculator.dashboard.value).toBe('');
  });

  it('printAction should not add *, -, /, %, . if dashpoar has action input already', () => {
    calculator.printDigit('5');
    calculator.printAction('*');
    calculator.printAction('-');
    expect(calculator.dashboard.value).toBe('5*');
  });

  it('solve should to be defined', () => {
    expect(calculator.solve).toBeDefined();
  });

  it('solve should to evalute expression', () => {
    calculator.clr();
    calculator.printDigit('5');
    calculator.printAction('*');
    calculator.printDigit('5');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('25');
  });

  it('toggleTheme should to be defined', () => {
    expect(calculator.toggleTheme).toBeDefined();
  });

  it('setTheme should to be call in calculator.toggleTheme', () => {
    const onSpy = jest.spyOn(calculator, 'setTheme');
    calculator.toggleTheme();
    //calculator.theme 
    setTimeout(() => {
      expect(onSpy).toHaveBeenCalled();
    }, 500)
  });

  it('save should to be defined', () => {
    expect(calculator.save).toBeDefined();
  });

  it('result should to be saved in localStorage', () => {
    calculator.save();
    //calculator.theme 
    expect(localStorage.getItem('result')).toBe(calculator.dashboard.value);
  });

});


