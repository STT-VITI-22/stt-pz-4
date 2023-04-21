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

  beforeEach(()=>{
    calculator.clr();
    localStorage.clear();
  });

  describe('printDigit', () => {
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
      calculator.paste()
      expect(onSpy).toHaveBeenCalled();
    });
  });

  describe('printAction', () => {

    it('printAction should to be defined', () => {
      expect(calculator.printAction).toBeDefined();
    });

    it('should not add an action if the display is empty', () => {
      calculator.printAction('+');
      expect(calculator.dashboard.value).toBe('');
    });

    it('should not add an action if the display already ends with an action', () => {
      calculator.printDigit('3');
      calculator.printAction('+');
      calculator.printAction('*');
      expect(calculator.dashboard.value).toBe('3+');
    });

    it('should add an action if the display ends with a digit', () => {
      calculator.printDigit('5');
      calculator.printAction('*');
      expect(calculator.dashboard.value).toBe('5*');
    });

    it('should allow the decimal point as an action', () => {
      calculator.printDigit('1');
      calculator.printAction('.');
      calculator.printDigit('2');
      expect(calculator.dashboard.value).toBe('1.2');
    });

    it('should toggle the sign of the first digit if +/- is pressed', () => {
      calculator.printDigit('7');
      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('-7');
      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('7');
    });
  });

  describe('solve', () => {
    it('should evaluate the expression and display the result', () => {
      calculator.printDigit('2');
      calculator.printAction('+');
      calculator.printDigit('2');
      calculator.solve();
      expect(calculator.dashboard.value).toBe('4');
    });

    it('should handle division by zero', () => {
      calculator.printDigit('5');
      calculator.printAction('/');
      calculator.printDigit('0');
      calculator.solve();
      expect(calculator.dashboard.value).toBe('Infinity');
    });
  });

  describe('clr', () => {
    it('should clear the display', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.clr();
      expect(calculator.dashboard.value).toBe('');
    });
  });

  describe('setTheme', () => {
    it('should set the body class to the given theme', () => {
      calculator.setTheme('theme-two');
      expect(document.body.className).toBe('theme-two');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle between theme-one and theme-second', () => {
      localStorage.setItem('theme', 'theme-one');
      calculator.toggleTheme();
      setTimeout(() => {
        expect(localStorage.getItem('theme')).toBe('theme-second');
      }, 1000)
     
      calculator.toggleTheme();
      setTimeout(() => {
      expect(localStorage.getItem('theme')).toBe('theme-one');
    }, 1000)
    });
  });

  describe('localStorage',()=>{
    it('save should save the current result in localStorage', () => {
      localStorage.clear();
      calculator.dashboard.value = '42';
      calculator.save();
      expect(localStorage.getItem('result')).toBe('42');
    });
    
    it('paste should print the saved result in the calculator dashboard', () => {
      localStorage.clear();
      localStorage.setItem('result', '42');
      const onSpy = jest.spyOn(calculator, 'printDigit');
      calculator.paste();
      expect(onSpy).toHaveBeenCalledWith('42');
    });
  })
  describe('save and paste', () => {
    it('should save the result to localStorage', () => {
      calculator.dashboard.value = '42';
      calculator.save();
      expect(localStorage.getItem('result')).toBe( '42');

    });

    it('should paste the saved result from localStorage', () => {
      localStorage.setItem('result', '42');
      calculator.paste();
      expect(calculator.dashboard.value).toBe('42');
    });
  });
});


