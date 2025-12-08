import { Calculator } from './Calculator';
import { evaluate } from 'mathjs';

document.body.innerHTML = `<input id="dashboard" value="0" />`;
const dashboard = document.getElementById('dashboard') as HTMLInputElement;

describe('Test suite for Calculator.ts – BDD style (DOM-based)', () => {
  let calc: Calculator;

  beforeEach(() => {
    dashboard.value = '0';
    localStorage.clear();
    calc = new Calculator(); 
  });

  it('should be defined and find dashboard element', () => {
    expect(calc).toBeDefined();
    expect(calc.dashboard).toBe(dashboard);
  });

  describe('printDigit', () => {
    it('should append digit to current value', () => {
      calc.printDigit('5');
      expect(dashboard.value).toBe('05');

      calc.printDigit('3');
      expect(dashboard.value).toBe('053');
    });

    it('should work from empty or "0" state', () => {
      dashboard.value = '';
      calc.printDigit('7');
      expect(dashboard.value).toBe('7');
    });
  });

  describe('printAction', () => {
    it('should append operator if last char is not operator', () => {
      dashboard.value = '15';
      calc.printAction('+');
      expect(dashboard.value).toBe('15+');
    });

    it('should NOT append operator if last char is already operator', () => {
      dashboard.value = '10+';
      calc.printAction('-');
      expect(dashboard.value).toBe('10+'); // не додає -
    });

    it('should NOT append anything if value is empty', () => {
      dashboard.value = '';
      calc.printAction('*');
      expect(dashboard.value).toBe('');
    });

    it('should toggle plus/minus with "+/-"', () => {
      dashboard.value = '42';
      calc.printAction('+/-');
      expect(dashboard.value).toBe('-42');

      calc.printAction('+/-');
      expect(dashboard.value).toBe('42');
    });

    it('should handle plus/minus on zero', () => {
      dashboard.value = '0';
      calc.printAction('+/-');
      expect(dashboard.value).toBe('-0');
    });
  });

  describe('solve', () => {
    it('should correctly evaluate simple expressions', () => {
      dashboard.value = '6*7';
      calc.solve();
      expect(dashboard.value).toBe('42');
    });

    it('should handle addition', () => {
      dashboard.value = '20+22';
      calc.solve();
      expect(dashboard.value).toBe('42');
    });

    it('should handle division', () => {
      dashboard.value = '84/2';
      calc.solve();
      expect(dashboard.value).toBe('42');
    });

    it('should handle complex expressions', () => {
      dashboard.value = '10+20*2-8/4';
      calc.solve();
      expect(dashboard.value).toBe('48');
    });
  });

  describe('clr', () => {
    it('should clear the display', () => {
      dashboard.value = '999';
      calc.clr();
      expect(dashboard.value).toBe('');
    });
  });

  describe('save & paste', () => {
    it('should save current value and paste it later', () => {
      dashboard.value = '123.45';
      calc.save();
      dashboard.value = '';
      calc.paste();
      expect(dashboard.value).toBe('123.45');
    });

    it('should paste nothing if nothing was saved', () => {
      dashboard.value = '888';
      calc.paste(); 
      expect(dashboard.value).toBe('888null'); 
    });
  });

 describe('theme toggle', () => {
    it('should toggle between theme-one and theme-second', async () => {
      localStorage.setItem('theme', 'theme-one');
      
      calc.toggleTheme();
      await new Promise(resolve => setTimeout(resolve, 600));

      expect(localStorage.getItem('theme')).toBe('theme-second');

      calc.toggleTheme();
      await new Promise(resolve => setTimeout(resolve, 600));

      expect(localStorage.getItem('theme')).toBe('theme-one');
    });
  });
});