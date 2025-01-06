import { Calculator } from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator: Calculator;
  beforeAll(() => {
    let inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard';
    document.body.appendChild(inputResult);

    calculator = new Calculator()
  });
  beforeEach(() => {
    calculator.clr();
  });
  afterAll(() => {
    // Очищаємо DOM після тестів
    document.body.innerHTML = '';
  });

  it('printDigit should to be defined', () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it('printDigit should add new value', () => {
    calculator.printDigit('5');
    calculator.printDigit('3');
    expect(calculator.dashboard.value).toBe('53');
  });

  it('printDigit should be called in calculator.paste', () => {
    localStorage.setItem('result', '123');
    const onSpy = jest.spyOn(calculator, 'printDigit');
    calculator.paste();
    expect(onSpy).toHaveBeenCalledWith('123');
  });

  it('printAction should be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('printAction should add an action to the dashboard', () => {
    calculator.printDigit('5');
    calculator.printAction('+');
    calculator.printDigit('3');
    expect(calculator.dashboard.value).toBe('5+3');
  });

  it('solve should evaluate the expression', () => {
    calculator.printDigit('5');
    calculator.printAction('+');
    calculator.printDigit('3');
    calculator.solve();
    expect(calculator.dashboard.value).toBe('8');
  });

  it('clr should clear the dashboard', () => {
    calculator.printDigit('5');
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });

  it('toggleTheme should toggle between themes', () => {
    calculator.toggleTheme();
    expect(document.body.className).toBe('theme-second');

    calculator.toggleTheme();
    expect(document.body.className).toBe('theme-one');
  });



});


