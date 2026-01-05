import {Calculator} from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator: Calculator;

  beforeEach(() => {
    let inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard'
    inputResult.className = "app-result";
    document.body.appendChild(inputResult);

    calculator = new Calculator()
    calculator.dashboard = inputResult;
    calculator.dashboard.value = '';

    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('printDigit', () => {
    it('should be defined', () => {
      expect(calculator.printDigit).toBeDefined();
    });

    it('should add digit to dashboard value', () => {
      calculator.printDigit('5');
      calculator.printDigit('5');
      expect(calculator.dashboard.value).toBe('55');
    });

    it('should add multiple different digits', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      expect(calculator.dashboard.value).toBe('123');
    });
  });

  describe('printAction', () => {
    it('should be defined', () => {
      expect(calculator.printAction).toBeDefined();
    });

    it('should add operator when dashboard has a digit', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('+');
      expect(calculator.dashboard.value).toBe('5+');
    });

    it('should not add operator when dashboard is empty', () => {
      calculator.dashboard.value = '';
      calculator.printAction('+');
      expect(calculator.dashboard.value).toBe('');
    });

    it('should not add operator when last character is already an operator', () => {
      calculator.dashboard.value = '5+';
      calculator.printAction('-');
      expect(calculator.dashboard.value).toBe('5+');
    });

    it('should toggle negative sign when +/- is pressed with positive number', () => {
      calculator.dashboard.value = '123';
      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('-123');
    });

    it('should toggle negative sign when +/- is pressed with negative number', () => {
      calculator.dashboard.value = '-123';
      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('123');
    });

    it('should add minus operator when value exists', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('-');
      expect(calculator.dashboard.value).toBe('5-');
    });

    it('should add multiplication operator when value exists', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('*');
      expect(calculator.dashboard.value).toBe('5*');
    });

    it('should add division operator when value exists', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('/');
      expect(calculator.dashboard.value).toBe('5/');
    });

    it('should add modulo operator when value exists', () => {
      calculator.dashboard.value = '5';
      calculator.printAction('%');
      expect(calculator.dashboard.value).toBe('5%');
    });
  });

  describe('solve', () => {
    it('should be defined', () => {
      expect(calculator.solve).toBeDefined();
    });

    it('should evaluate simple addition', () => {
      calculator.dashboard.value = '2+3';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('5');
    });

    it('should evaluate simple subtraction', () => {
      calculator.dashboard.value = '10-3';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('7');
    });

    it('should evaluate simple multiplication', () => {
      calculator.dashboard.value = '4*5';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('20');
    });

    it('should evaluate simple division', () => {
      calculator.dashboard.value = '15/3';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('5');
    });

    it('should evaluate complex expression', () => {
      calculator.dashboard.value = '2+3*4';
      calculator.solve();
      expect(calculator.dashboard.value).toBe('14');
    });
  });

  describe('clr', () => {
    it('should be defined', () => {
      expect(calculator.clr).toBeDefined();
    });

    it('should clear dashboard value', () => {
      calculator.dashboard.value = '12345';
      calculator.clr();
      expect(calculator.dashboard.value).toBe('');
    });

    it('should clear empty dashboard value', () => {
      calculator.dashboard.value = '';
      calculator.clr();
      expect(calculator.dashboard.value).toBe('');
    });
  });

  describe('setTheme', () => {
    it('should be defined', () => {
      expect(calculator.setTheme).toBeDefined();
    });

    it('should set theme-one in localStorage and body class', () => {
      calculator.setTheme('theme-one');
      expect(localStorage.getItem('theme')).toBe('theme-one');
      expect(document.body.className).toBe('theme-one');
    });

    it('should set theme-second in localStorage and body class', () => {
      calculator.setTheme('theme-second');
      expect(localStorage.getItem('theme')).toBe('theme-second');
      expect(document.body.className).toBe('theme-second');
    });

    it('should call setTheme when Calculator is instantiated', () => {
      const setThemeSpy = jest.spyOn(Calculator.prototype, 'setTheme');
      new Calculator();
      expect(setThemeSpy).toHaveBeenCalledWith('theme-one');
      setThemeSpy.mockRestore();
    });
  });

  describe('toggleTheme', () => {
    it('should be defined', () => {
      expect(calculator.toggleTheme).toBeDefined();
    });

    it('should toggle from theme-one to theme-second', (done) => {
      localStorage.setItem('theme', 'theme-one');
      const setThemeSpy = jest.spyOn(calculator, 'setTheme');

      calculator.toggleTheme();

      setTimeout(() => {
        expect(setThemeSpy).toHaveBeenCalledWith('theme-second');
        setThemeSpy.mockRestore();
        done();
      }, 600);
    });

    it('should toggle from theme-second to theme-one', (done) => {
      localStorage.setItem('theme', 'theme-second');
      const setThemeSpy = jest.spyOn(calculator, 'setTheme');

      calculator.toggleTheme();

      setTimeout(() => {
        expect(setThemeSpy).toHaveBeenCalledWith('theme-one');
        setThemeSpy.mockRestore();
        done();
      }, 600);
    });
  });

  describe('save and paste', () => {
    it('should save dashboard value to localStorage', () => {
      calculator.dashboard.value = '12345';
      calculator.save();
      expect(localStorage.getItem('result')).toBe('12345');
    });

    it('should paste saved value from localStorage', () => {
      localStorage.setItem('result', '999');
      calculator.dashboard.value = '';
      calculator.paste();
      expect(calculator.dashboard.value).toBe('999');
    });

    it('should call printDigit when paste is invoked', () => {
      localStorage.setItem('result', '123');
      const printDigitSpy = jest.spyOn(calculator, 'printDigit');
      calculator.paste();
      expect(printDigitSpy).toHaveBeenCalledWith('123');
      printDigitSpy.mockRestore();
    });

    it('should paste null when localStorage is empty', () => {
      localStorage.clear();
      calculator.dashboard.value = '5';
      calculator.paste();
      expect(calculator.dashboard.value).toBe('5null');
    });
  });

  describe('actions array', () => {
    it('should contain all valid operators', () => {
      expect(calculator.actions).toContain('+');
      expect(calculator.actions).toContain('-');
      expect(calculator.actions).toContain('*');
      expect(calculator.actions).toContain('/');
      expect(calculator.actions).toContain('.');
      expect(calculator.actions).toContain('%');
    });

    it('should have correct length', () => {
      expect(calculator.actions.length).toBe(6);
    });
  });

});


