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

  // it('printDigit визначена та додає цифри', () => {
  //   expect(calculator.printDigit).toBeDefined();
  //   calculator.printDigit('5');
  //   calculator.printDigit('3');
  //   expect(calculator.dashboard.value).toBe('53');
  // });

  // it('можна ввести багато цифр (100 цифр)', () => {
  //   for (let i = 0; i < 100; i++) calculator.printDigit('9');
  //   expect(calculator.dashboard.value.length).toBe(100);
  //   expect(calculator.dashboard.value).toBe('9'.repeat(100));
  // });

  // // ---------------- Оператори ----------------

  // it('printAction додає оператор після цифри', () => {
  //   calculator.dashboard.value = '5';
  //   calculator.printAction('+');
  //   expect(calculator.dashboard.value).toBe('5+');
  // });

  // it('не можна додати оператор поспіль', () => {
  //   calculator.dashboard.value = '5+';
  //   calculator.printAction('-');
  //   expect(calculator.dashboard.value).toBe('5+');
  // });

  // it('не можна додати багато однакових операторів підряд', () => {
  //   calculator.dashboard.value = '5';
  //   calculator.printAction('+');
  //   calculator.printAction('+');
  //   calculator.printAction('+');
  //   expect(calculator.dashboard.value).toBe('5+');
  // });

  // it('printAction не додає + на початку', () => {
  //   calculator.dashboard.value = '';
  //   calculator.printAction('+');
  //   expect(calculator.dashboard.value).toBe('');
  // });

  // it('можна ставити мінус на початку числа', () => {
  //   calculator.dashboard.value = '';
  //   calculator.printAction('+/-');
  //   expect(calculator.dashboard.value).toBe('-');
  // });

  // it('printAction повинен перемикати знак +/−', () => {
  //   calculator.dashboard.value = '5';
  //   calculator.printAction('+/-');
  //   expect(calculator.dashboard.value).toBe('-5');
  //   calculator.printAction('+/-');
  //   expect(calculator.dashboard.value).toBe('5');
  // });

  // // ---------------- Крапка ----------------

  // it('не можна ставити крапку без числа перед нею', () => {
  //   calculator.dashboard.value = '';
  //   calculator.printAction('.');
  //   expect(calculator.dashboard.value).toBe('');
  // });

  // it('не можна ставити дві крапки підряд', () => {
  //   calculator.dashboard.value = '5.';
  //   calculator.printAction('.');
  //   expect(calculator.dashboard.value).toBe('5.');
  // });

  // it('крапку можна ставити після числа', () => {
  //   calculator.dashboard.value = '7';
  //   calculator.printAction('.');
  //   expect(calculator.dashboard.value).toBe('7.');
  // });

  // it('оператор не додається після крапки', () => {
  //   calculator.dashboard.value = '3.';
  //   calculator.printAction('+');
  //   expect(calculator.dashboard.value).toBe('3.');
  // });

  // // ---------------- Відсотки ----------------

  // it('printAction не додає подвійні відсотки', () => {
  //   calculator.dashboard.value = '50%';
  //   calculator.printAction('%');
  //   expect(calculator.dashboard.value).toBe('50%');
  // });

  // it('solve правильно обробляє відсотки', () => {
  //   calculator.dashboard.value = '50%';
  //   calculator.solve();
  //   expect(Number(calculator.dashboard.value)).toBeCloseTo(0.5);
  // });

  // // ---------------- solve ----------------

  // it('solve правильно обчислює простий вираз', () => {
  //   calculator.dashboard.value = '2+3*2';
  //   calculator.solve();
  //   expect(calculator.dashboard.value).toBe('8');
  // });

  // it('solve обробляє некоректний вираз без падіння (Error або число)', () => {
  //   calculator.dashboard.value = '2++3';
  //   calculator.solve();
  //   const val = calculator.dashboard.value;
  //   const ok = (/Error/i.test(val) || !isNaN(Number(val)));
  //   expect(ok).toBe(true);
  // });

  // it('solve працює з мінусом на початку', () => {
  //   calculator.dashboard.value = '-5+10';
  //   calculator.solve();
  //   expect(calculator.dashboard.value).toBe('5');
  // });

  // it('solve обробляє довгі вирази', () => {
  //   calculator.dashboard.value = '1+2-3*4/5+6-7*8/9';
  //   calculator.solve();
  //   expect(calculator.dashboard.value).not.toMatch(/Error/i);
  // });

  // it('solve обробляє пробіли та табуляції', () => {
  //   calculator.dashboard.value = ' 2 + 3 * 4 ';
  //   calculator.solve();
  //   expect(calculator.dashboard.value).toBe('14');
  // });

  // it('solve обробляє наукову нотацію', () => {
  //   calculator.dashboard.value = '1e3+2';
  //   calculator.solve();
  //   expect(calculator.dashboard.value).toBe('1002');
  // });

  // it('велике множення MAX_SAFE_INTEGER*2', () => {
  //   calculator.dashboard.value = '9007199254740991*2';
  //   calculator.solve();
  //   expect(Number(calculator.dashboard.value)).toBeCloseTo(18014398509481982);
  // });

  // // ---------------- clr ----------------

  // it('clr очищує екран і повертає фокус', () => {
  //   const focusSpy = jest.spyOn(calculator.dashboard, 'focus');
  //   calculator.dashboard.value = '999';
  //   calculator.clr();
  //   expect(calculator.dashboard.value).toBe('');
  //   expect(focusSpy).toHaveBeenCalled();
  // });

  // // ---------------- LocalStorage ----------------

  // it('save зберігає поточне значення', () => {
  //   calculator.dashboard.value = '777';
  //   calculator.save();
  //   expect(localStorage.getItem('result')).toBe('777');
  // });

  // it('paste вставляє збережене значення', () => {
  //   localStorage.setItem('result', '123');
  //   calculator.paste();
  //   expect(calculator.dashboard.value).toBe('123');
  // });

  // it('paste не вставляє null якщо нічого не збережено', () => {
  //   calculator.dashboard.value = '';
  //   calculator.paste();
  //   expect(calculator.dashboard.value).toBe('');
  // });

  // // ---------------- Теми ----------------

  // it('setTheme встановлює тему для body та localStorage', () => {
  //   calculator.setTheme('theme-one');
  //   expect(document.body.className).toBe('theme-one');
  //   expect(localStorage.getItem('theme')).toBe('theme-one');
  // });

  // it('toggleTheme перемикає між theme-one і theme-second', async () => {
  //   calculator.setTheme('theme-one');
  //   calculator.toggleTheme();
  //   await new Promise(r => setTimeout(r, 600));
  //   expect(document.body.className).toBe('theme-second');

  //   calculator.toggleTheme();
  //   await new Promise(r => setTimeout(r, 600));
  //   expect(document.body.className).toBe('theme-one');
  // });

  // // ---------------- Stress-тести ----------------

  // it('введення дуже довгого рядка (1000 цифр) не падає', () => {
  //   const longInput = '9'.repeat(1000);
  //   for (let c of longInput) calculator.printDigit(c);
  //   expect(calculator.dashboard.value.length).toBe(1000);
  //   expect(calculator.dashboard.value).toBe(longInput);
  // });

  // it('обчислення дуже довгого виразу не падає', () => {
  //   const expr = '1+'.repeat(500) + '1';
  //   calculator.dashboard.value = expr;
  //   expect(() => calculator.solve()).not.toThrow();
  //   expect(!isNaN(Number(calculator.dashboard.value))).toBe(true);
  // });

  
  // // ---------------- Ініціалізація ----------------
  // it('масив actions має правильні оператори', () => {
  //   expect(calculator.actions).toEqual(['+', '-', '*', '/', '.', '%']);
  // });

  // it('dashboard ініціалізується як HTMLInputElement', () => {
  //   expect(calculator.dashboard).toBeInstanceOf(HTMLInputElement);
  //   expect(calculator.dashboard.id).toBe('dashboard');
  // });




it('clr очищає значення dashboard і викликає focus()', () => {
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
  it('toggleTheme перемикає з theme-second на theme-one', () => {
    localStorage.setItem('theme', 'theme-second');
    const setThemeSpy = jest.spyOn(calculator, 'setTheme');

    calculator.toggleTheme();

    // setTimeout всередині toggleTheme — тому чекаємо 500мс + трохи
    setTimeout(() => {
      expect(setThemeSpy).toHaveBeenCalledWith('theme-one');
    }, 600);
  });
  it('toggleTheme перемикає з theme-one на theme-second', () => {
    localStorage.setItem('theme', 'theme-one');
    const setThemeSpy = jest.spyOn(calculator, 'setTheme');

    calculator.toggleTheme();

    setTimeout(() => {
      expect(setThemeSpy).toHaveBeenCalledWith('theme-second');
    }, 600);
  });
  it('toggleTheme правильно працює, коли тема ще не встановлена (за замовчуванням → theme-second)', () => {
    localStorage.removeItem('theme'); // немає збереженої теми
    const setThemeSpy = jest.spyOn(calculator, 'setTheme');

    calculator.toggleTheme();

    setTimeout(() => {
      expect(setThemeSpy).toHaveBeenCalledWith('theme-second');
    }, 600);
  });
  it('save зберігає поточне значення dashboard у localStorage', () => {
    calculator.dashboard.value = "42";
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    calculator.save();

    expect(setItemSpy).toHaveBeenCalledWith('result', '42');
  });
  it('paste вставляє збережене значення через printDigit, якщо воно є', () => {
    localStorage.setItem('result', '777');
    const printDigitSpy = jest.spyOn(calculator, 'printDigit');

    calculator.paste();

    expect(printDigitSpy).toHaveBeenCalledWith('777');
  });


//   it('showConsoleLog викликає console.log з правильним параметром', () => {
//   const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

//   calculator.showConsoleLog('hello');

//   expect(spy).toHaveBeenCalledWith('вивід:', 'hello');

//   spy.mockRestore();
// });

// it('showConsoleLog передає текст "вивід:" і параметр', () => {
//   const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

//   calculator.showConsoleLog(5);

//   expect(spy).toHaveBeenCalledWith('вивід:', 5);

//   spy.mockRestore();
// });

// it('showConsoleLog працює з масивом', () => {
//   const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

//   calculator.showConsoleLog([1,2,3]);

//   expect(spy).toHaveBeenCalledWith('вивід:', [1,2,3]);

//   spy.mockRestore();
// });


});
