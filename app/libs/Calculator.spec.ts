import { Calculator } from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator: Calculator;

  beforeAll(() => {
    const inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard';
    inputResult.className = "app-result";
    document.body.appendChild(inputResult);

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  afterEach(() => {
    calculator.dashboard.value = '';
  });

  it('printDigit should be defined', () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it('printDigit should add new value to the dashboard', () => {
    calculator.printDigit('5');
    calculator.printDigit('3');
    expect(calculator.dashboard.value).toBe('53');
  });

  it('printDigit should be called in paste method', () => {
    const onSpy = jest.spyOn(calculator, 'printDigit');
    localStorage.setItem('result', '42');
    calculator.paste();
    expect(onSpy).toHaveBeenCalledWith('42');
    expect(calculator.dashboard.value).toBe('42');
  });

  it('printAction should handle +/- toggle correctly', () => {
    calculator.dashboard.value = '5';
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('-5');
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('5');
  });

  it('solve should evaluate the expression', () => {
    calculator.dashboard.value = '5+3*2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('11');
  });

  it('clr should clear the dashboard', () => {
    calculator.dashboard.value = '123';
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });

  it('save should store the result in localStorage', () => {
    calculator.dashboard.value = '123';
    calculator.save();
    expect(localStorage.getItem('result')).toBe('123');
  });

  it('toggleTheme should switch between themes', () => {
    calculator.setTheme('theme-one');
    expect(localStorage.getItem('theme')).toBe('theme-one');
    calculator.toggleTheme();
    setTimeout(() => {
      expect(localStorage.getItem('theme')).toBe('theme-second');
    }, 500);
  });

  it('setTheme should set the body class name', () => {
    calculator.setTheme('theme-one');
    expect(document.body.className).toBe('theme-one');
  });
});
