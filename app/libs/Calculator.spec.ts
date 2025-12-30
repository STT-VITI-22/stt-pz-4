import { Calculator } from './Calculator';

describe('Тестовий набір для Calculator.ts (повне QA-покриття з stress-тестами)', () => {
  let calculator: Calculator;
  let inputResult: HTMLInputElement;

  beforeAll(() => {
    inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard';
    inputResult.className = "app-result";
    document.body.appendChild(inputResult);

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  beforeEach(() => {
    calculator.dashboard.value = '';
    localStorage.clear();
    document.body.className = '';
  });

  // ---------------- Цифри ----------------

  it('printDigit визначена та додає цифри', () => {
    expect(calculator.printDigit).toBeDefined();
    calculator.printDigit('5');
    calculator.printDigit('3');
    expect(calculator.dashboard.value).toBe('53');
  });

  it('можна ввести багато цифр (100 цифр)', () => {
    for (let i = 0; i < 100; i++) calculator.printDigit('9');
    expect(calculator.dashboard.value.length).toBe(100);
    expect(calculator.dashboard.value).toBe('9'.repeat(100));
  });

  // ---------------- Оператори ----------------

  it('printAction додає оператор після цифри', () => {
    calculator.dashboard.value = '5';
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('5+');
  });

  it('не можна додати оператор поспіль', () => {
    calculator.dashboard.value = '5+';
    calculator.printAction('-');
    expect(calculator.dashboard.value).toBe('5+');
  });

  it('не можна додати багато однакових операторів підряд', () => {
    calculator.dashboard.value = '5';
    calculator.printAction('+');
    calculator.printAction('+');
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('5+');
  });

  it('printAction не додає + на початку', () => {
    calculator.dashboard.value = '';
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('');
  });

  it('можна ставити мінус на початку числа', () => {
    calculator.dashboard.value = '';
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('-');
  });

  it('printAction повинен перемикати знак +/−', () => {
    calculator.dashboard.value = '5';
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('-5');
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('5');
  });

  // ---------------- Крапка ----------------

  it('не можна ставити крапку без числа перед нею', () => {
    calculator.dashboard.value = '';
    calculator.printAction('.');
    expect(calculator.dashboard.value).toBe('');
  });

  it('не можна ставити дві крапки підряд', () => {
    calculator.dashboard.value = '5.';
    calculator.printAction('.');
    expect(calculator.dashboard.value).toBe('5.');
  });

  it('крапку можна ставити після числа', () => {
    calculator.dashboard.value = '7';
    calculator.printAction('.');
    expect(calculator.dashboard.value).toBe('7.');
  });

  it('оператор не додається після крапки', () => {
    calculator.dashboard.value = '3.';
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('3.');
  });

  // ---------------- Відсотки ----------------

  it('printAction не додає подвійні відсотки', () => {
    calculator.dashboard.value = '50%';
    calculator.printAction('%');
    expect(calculator.dashboard.value).toBe('50%');
  });

  it('solve правильно обробляє відсотки', () => {
    calculator.dashboard.value = '50%';
    calculator.solve();
    expect(Number(calculator.dashboard.value)).toBeCloseTo(0.5);
  });
  
  it('printAction додає ^2 після числа', () => {
    calculator.dashboard.value = '5';
    calculator.printAction('^2');
    expect(calculator.dashboard.value).toBe('5^2');
  });

  
  it('solve правильно обчислює 5^2 = 25', () => {
    calculator.dashboard.value = '5^2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('25');
  });

  
  it('solve правильно обчислює -3^2 = -9', () => {
    calculator.dashboard.value = '-3^2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('-9');
  });

  
  it('solve правильно обчислює 2.5^2 = 6.25', () => {
    calculator.dashboard.value = '2.5^2';
    calculator.solve();
    expect(Number(calculator.dashboard.value)).toBeCloseTo(6.25);
  });

  
  it('solve правильно обчислює 0^2 = 0', () => {
    calculator.dashboard.value = '0^2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('0');
  });

  
  it('solve правильно обчислює 3^2+4 = 13', () => {
    calculator.dashboard.value = '3^2+4';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('13');
  });

  
  it('solve правильно обчислює 2*3^2 = 18', () => {
    calculator.dashboard.value = '2*3^2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('18');
  });

  
  it('solve правильно обчислює 2^2+3^2 = 13', () => {
    calculator.dashboard.value = '2^2+3^2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('13');
  });

  
  it('solve правильно обчислює 100^2 = 10000', () => {
    calculator.dashboard.value = '100^2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('10000');
  });

  
  it('printAction не додає ^2 на порожньому полі', () => {
    calculator.dashboard.value = '';
    calculator.printAction('^2');
    expect(calculator.dashboard.value).toBe('');
  });

  // ---------------- solve ----------------

  it('solve правильно обчислює простий вираз', () => {
    calculator.dashboard.value = '2+3*2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('8');
  });

  it('solve обробляє некоректний вираз без падіння (Error або число)', () => {
    calculator.dashboard.value = '2++3';
    calculator.solve();
    const val = calculator.dashboard.value;
    const ok = (/Error/i.test(val) || !isNaN(Number(val)));
    expect(ok).toBe(true);
  });

  it('solve працює з мінусом на початку', () => {
    calculator.dashboard.value = '-5+10';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('5');
  });

  it('solve обробляє довгі вирази', () => {
    calculator.dashboard.value = '1+2-3*4/5+6-7*8/9';
    calculator.solve();
    expect(calculator.dashboard.value).not.toMatch(/Error/i);
  });

  it('solve обробляє пробіли та табуляції', () => {
    calculator.dashboard.value = ' 2 + 3 * 4 ';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('14');
  });

  it('solve обробляє наукову нотацію', () => {
    calculator.dashboard.value = '1e3+2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('1002');
  });

  it('велике множення MAX_SAFE_INTEGER*2', () => {
    calculator.dashboard.value = '9007199254740991*2';
    calculator.solve();
    expect(Number(calculator.dashboard.value)).toBeCloseTo(18014398509481982);
  });

  // ---------------- clr ----------------

  it('clr очищує екран і повертає фокус', () => {
    const focusSpy = jest.spyOn(calculator.dashboard, 'focus');
    calculator.dashboard.value = '999';
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
    expect(focusSpy).toHaveBeenCalled();
  });

  // ---------------- LocalStorage ----------------

  it('save зберігає поточне значення', () => {
    calculator.dashboard.value = '777';
    calculator.save();
    expect(localStorage.getItem('result')).toBe('777');
  });

  it('paste вставляє збережене значення', () => {
    localStorage.setItem('result', '123');
    calculator.paste();
    expect(calculator.dashboard.value).toBe('123');
  });

  it('paste не вставляє null якщо нічого не збережено', () => {
    calculator.dashboard.value = '';
    calculator.paste();
    expect(calculator.dashboard.value).toBe('');
  });

  // ---------------- Теми ----------------

  it('setTheme встановлює тему для body та localStorage', () => {
    calculator.setTheme('theme-one');
    expect(document.body.className).toBe('theme-one');
    expect(localStorage.getItem('theme')).toBe('theme-one');
  });

  it('toggleTheme перемикає між theme-one і theme-second', async () => {
    calculator.setTheme('theme-one');
    calculator.toggleTheme();
    await new Promise(r => setTimeout(r, 600));
    expect(document.body.className).toBe('theme-second');

    calculator.toggleTheme();
    await new Promise(r => setTimeout(r, 600));
    expect(document.body.className).toBe('theme-one');
  });

  // ---------------- Stress-тести ----------------

  it('введення дуже довгого рядка (1000 цифр) не падає', () => {
    const longInput = '9'.repeat(1000);
    for (let c of longInput) calculator.printDigit(c);
    expect(calculator.dashboard.value.length).toBe(1000);
    expect(calculator.dashboard.value).toBe(longInput);
  });

  it('обчислення дуже довгого виразу не падає', () => {
    const expr = '1+'.repeat(500) + '1';
    calculator.dashboard.value = expr;
    expect(() => calculator.solve()).not.toThrow();
    expect(!isNaN(Number(calculator.dashboard.value))).toBe(true);
  });

  
  // ---------------- Ініціалізація ----------------
  it('масив actions має правильні оператори', () => {
    expect(calculator.actions).toEqual(['+', '-', '*', '/', '.', '%', '^2']);
  });

  it('dashboard ініціалізується як HTMLInputElement', () => {
    expect(calculator.dashboard).toBeInstanceOf(HTMLInputElement);
    expect(calculator.dashboard.id).toBe('dashboard');
  });

  it('clr очищує значення dashboard і викликає focus()', () => {
    calculator.dashboard.value = "12345";

    const focusSpy = jest.spyOn(calculator.dashboard, 'focus');

    calculator.clr();

    expect(calculator.dashboard.value).toBe('');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('setTheme зберігає тему в localStorage і встановлює className body', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    calculator.setTheme('theme-second');

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'theme-second');
    expect(document.body.className).toBe('theme-second');
  });
  
it('solve правильно обчислює квадрат великого числа 9999^2', () => {
  calculator.dashboard.value = '9999^2';
  calculator.solve();
  expect(Number(calculator.dashboard.value)).toBeCloseTo(99980001);
});


it('solve обчислює суму багатьох квадратів без падіння', () => {
  calculator.dashboard.value = '1^2+2^2+3^2+4^2+5^2+6^2+7^2+8^2+9^2+10^2';
  calculator.solve();
  expect(calculator.dashboard.value).toBe('385'); // 1+4+9+16+25+36+49+64+81+100
});


it('solve обчислює складний вираз 10^2-5^2*2+3^2/3 без помилок', () => {
  calculator.dashboard.value = '10^2-5^2*2+3^2/3';
  calculator.solve();
  expect(() => calculator.solve()).not.toThrow();
  expect(!isNaN(Number(calculator.dashboard.value))).toBe(true);
});


it('квадрат дуже довгого числа не падає', () => {
  const longNumber = '9'.repeat(50);
  calculator.dashboard.value = longNumber + '^2';
  expect(() => calculator.solve()).not.toThrow();
  expect(calculator.dashboard.value).not.toBe('');
});

});