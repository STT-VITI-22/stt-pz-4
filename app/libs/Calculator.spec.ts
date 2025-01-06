import { Calculator } from './Calculator'; 

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    document.body.innerHTML = `<input type="text" id="dashboard">`;
    calculator = new Calculator();
  });

  describe('when the user enters a number and an operator', () => {
    it('should append "+" to the current display when "+" is pressed', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      expect(calculator.dashboard.value).toBe('5+');
    });

    it('should toggle the sign of the number when "+/-" is pressed', () => {
      calculator.printDigit('5');
      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('-5');

      calculator.printAction('+/-');
      expect(calculator.dashboard.value).toBe('5');
    });
  });

  describe('when the user enters an expression and presses "="', () => {
    it('should solve the expression and display the result', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('5');
      calculator.solve();
      expect(calculator.dashboard.value).toBe('10');
    });

    it('should handle complex expressions correctly', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('5');
      calculator.printAction('*');
      calculator.printDigit('2');
      calculator.solve();
      expect(calculator.dashboard.value).toBe('20');
    });
  });

  describe('when the user clicks on the "AC" button', () => {
    it('should clear the display', () => {
      calculator.printDigit('5');
      calculator.clr();
      expect(calculator.dashboard.value).toBe('');
    });
  });

  describe('when the user toggles the theme', () => {
    it('should toggle between themes', () => {
      localStorage.setItem('theme', 'theme-one');
      calculator.toggleTheme();
      expect(localStorage.getItem('theme')).toBe('theme-second');
      expect(document.body.className).toBe('theme-second');

      calculator.toggleTheme();
      expect(localStorage.getItem('theme')).toBe('theme-one');
      expect(document.body.className).toBe('theme-one');
    });
  });

  describe('when the user saves the result', () => {
    it('should store the result in localStorage', () => {
      calculator.printDigit('10');
      calculator.save();
      expect(localStorage.getItem('result')).toBe('10');
    });
  });

  describe('when the user pastes a saved result', () => {
    it('should display the saved result on the dashboard', () => {
      localStorage.setItem('result', '20');
      calculator.paste();
      expect(calculator.dashboard.value).toBe('20');
    });
  });
});
