import { Calculator } from './Calculator';

/**
 * BDD Test Suite for Calculator.ts
 * Testing DOM-based calculator with behavior-driven approach
 */
describe('Test suite for Calculator.ts', () => {
  let calculator: Calculator;

  beforeAll(() => {
    // Setup calculator with dashboard input
    let inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard';
    inputResult.className = "app-result";

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  beforeEach(() => {
    // Clear calculator before each test
    calculator.clear();
  });

  describe('Initialization', () => {
    it('should create calculator instance', () => {
      expect(calculator).toBeDefined();
      expect(calculator).toBeInstanceOf(Calculator);
    });

    it('should have dashboard property', () => {
      expect(calculator.dashboard).toBeDefined();
      expect(calculator.dashboard.type).toBe('text');
    });

    it('should initialize with value "0"', () => {
      const newCalc = new Calculator();
      expect(newCalc.dashboard.value).toBe('0');
    });
  });

  describe('printDigit method', () => {
    it('should be defined', () => {
      expect(calculator.printDigit).toBeDefined();
    });

    describe('when printing single digits', () => {
      it('should replace initial 0 with digit', () => {
        calculator.dashboard.value = '0';
        calculator.printDigit('5');
        expect(calculator.dashboard.value).toBe('5');
      });

      it('should print digit 0', () => {
        calculator.dashboard.value = '0';
        calculator.printDigit('0');
        expect(calculator.dashboard.value).toBe('0');
      });

      it('should print all digits 0-9', () => {
        calculator.clear();
        calculator.printDigit('1');
        calculator.printDigit('2');
        calculator.printDigit('3');
        calculator.printDigit('4');
        calculator.printDigit('5');
        calculator.printDigit('6');
        calculator.printDigit('7');
        calculator.printDigit('8');
        calculator.printDigit('9');
        calculator.printDigit('0');
        expect(calculator.dashboard.value).toBe('1234567890');
      });
    });

    describe('when printing multiple digits', () => {
      it('should add new value', () => {
        calculator.clear();
        calculator.printDigit('5');
        calculator.printDigit('5');
        expect(calculator.dashboard.value).toBe('55');
      });

      it('should concatenate digits correctly', () => {
        calculator.clear();
        calculator.printDigit('1');
        calculator.printDigit('2');
        calculator.printDigit('3');
        expect(calculator.dashboard.value).toBe('123');
      });

      it('should handle long numbers', () => {
        calculator.clear();
        calculator.printDigit('9');
        calculator.printDigit('8');
        calculator.printDigit('7');
        calculator.printDigit('6');
        calculator.printDigit('5');
        expect(calculator.dashboard.value).toBe('98765');
      });
    });

    describe('when printing decimal point', () => {
      it('should add decimal point', () => {
        calculator.clear();
        calculator.printDigit('5');
        calculator.printDigit('.');
        calculator.printDigit('5');
        expect(calculator.dashboard.value).toBe('5.5');
      });

      it('should not add multiple decimal points', () => {
        calculator.clear();
        calculator.printDigit('5');
        calculator.printDigit('.');
        calculator.printDigit('5');
        calculator.printDigit('.');
        calculator.printDigit('5');
        expect(calculator.dashboard.value).toBe('5.55');
      });

      it('should allow decimal point after zero', () => {
        calculator.dashboard.value = '0';
        calculator.printDigit('.');
        calculator.printDigit('5');
        expect(calculator.dashboard.value).toBe('0.5');
      });
    });
  });

  describe('printAction method', () => {
    it('should be defined', () => {
      expect(calculator.printAction).toBeDefined();
    });

    describe('when setting action', () => {
      it('should set addition action', () => {
        calculator.printDigit('5');
        calculator.printAction('+');
        expect(calculator.getCurrentAction()).toBe('+');
      });

      it('should set subtraction action', () => {
        calculator.printDigit('5');
        calculator.printAction('-');
        expect(calculator.getCurrentAction()).toBe('-');
      });

      it('should set multiplication action', () => {
        calculator.printDigit('5');
        calculator.printAction('*');
        expect(calculator.getCurrentAction()).toBe('*');
      });

      it('should set division action', () => {
        calculator.printDigit('5');
        calculator.printAction('/');
        expect(calculator.getCurrentAction()).toBe('/');
      });

      it('should store previous value', () => {
        calculator.printDigit('1');
        calculator.printDigit('0');
        calculator.printAction('+');
        expect(calculator.getPreviousValue()).toBe('10');
      });

      it('should reset dashboard after action', () => {
        calculator.printDigit('5');
        calculator.printAction('+');
        expect(calculator.dashboard.value).toBe('0');
      });
    });
  });

  describe('calculate method', () => {
    it('should be defined', () => {
      expect(calculator.calculate).toBeDefined();
    });

    describe('when adding numbers', () => {
      it('should add two positive numbers', () => {
        calculator.printDigit('5');
        calculator.printAction('+');
        calculator.printDigit('3');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('8');
      });

      it('should add multiple numbers', () => {
        calculator.printDigit('1');
        calculator.printAction('+');
        calculator.printDigit('2');
        calculator.printAction('+');
        calculator.printDigit('3');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('6');
      });

      it('should handle decimal addition', () => {
        calculator.printDigit('5');
        calculator.printDigit('.');
        calculator.printDigit('5');
        calculator.printAction('+');
        calculator.printDigit('2');
        calculator.printDigit('.');
        calculator.printDigit('5');
        calculator.calculate();
        expect(parseFloat(calculator.dashboard.value)).toBeCloseTo(8, 1);
      });
    });

    describe('when subtracting numbers', () => {
      it('should subtract two numbers', () => {
        calculator.printDigit('1');
        calculator.printDigit('0');
        calculator.printAction('-');
        calculator.printDigit('3');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('7');
      });

      it('should handle negative result', () => {
        calculator.printDigit('3');
        calculator.printAction('-');
        calculator.printDigit('1');
        calculator.printDigit('0');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('-7');
      });
    });

    describe('when multiplying numbers', () => {
      it('should multiply two numbers', () => {
        calculator.printDigit('5');
        calculator.printAction('*');
        calculator.printDigit('3');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('15');
      });

      it('should multiply by zero', () => {
        calculator.printDigit('5');
        calculator.printAction('*');
        calculator.printDigit('0');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('0');
      });
    });

    describe('when dividing numbers', () => {
      it('should divide two numbers', () => {
        calculator.printDigit('1');
        calculator.printDigit('0');
        calculator.printAction('/');
        calculator.printDigit('2');
        calculator.calculate();
        expect(calculator.dashboard.value).toBe('5');
      });

     it('should handle division by zero', () => {
  const clearSpy = jest.spyOn(calculator, 'clear');
  calculator.printDigit('5');
  calculator.printAction('/');
  calculator.printDigit('0');
  calculator.calculate();
  expect(clearSpy).toHaveBeenCalled();
  clearSpy.mockRestore();
});


      it('should handle decimal division', () => {
        calculator.printDigit('1');
        calculator.printDigit('0');
        calculator.printAction('/');
        calculator.printDigit('3');
        calculator.calculate();
        expect(parseFloat(calculator.dashboard.value)).toBeCloseTo(3.333, 2);
      });
    });
  });

  describe('clear method', () => {
    it('should be defined', () => {
      expect(calculator.clear).toBeDefined();
    });

    it('should reset dashboard to 0', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      calculator.clear();
      expect(calculator.dashboard.value).toBe('0');
    });

    it('should clear current action', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.clear();
      expect(calculator.getCurrentAction()).toBeNull();
    });

    it('should clear previous value', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.clear();
      expect(calculator.getPreviousValue()).toBe('');
    });
  });

  describe('clearEntry method', () => {
    it('should be defined', () => {
      expect(calculator.clearEntry).toBeDefined();
    });

    it('should clear only current entry', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      calculator.clearEntry();
      expect(calculator.dashboard.value).toBe('0');
    });

    it('should not affect previous value', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('3');
      calculator.clearEntry();
      expect(calculator.getPreviousValue()).toBe('5');
    });
  });

  describe('backspace method', () => {
    it('should be defined', () => {
      expect(calculator.backspace).toBeDefined();
    });

    it('should remove last character', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      calculator.backspace();
      expect(calculator.dashboard.value).toBe('12');
    });

    it('should reset to 0 when only one character', () => {
      calculator.printDigit('5');
      calculator.backspace();
      expect(calculator.dashboard.value).toBe('0');
    });

    it('should handle multiple backspaces', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      calculator.printDigit('4');
      calculator.backspace();
      calculator.backspace();
      expect(calculator.dashboard.value).toBe('12');
    });
  });

  describe('changeSign method', () => {
    it('should be defined', () => {
      expect(calculator.changeSign).toBeDefined();
    });

    it('should change positive to negative', () => {
      calculator.printDigit('5');
      calculator.changeSign();
      expect(calculator.dashboard.value).toBe('-5');
    });

    it('should change negative to positive', () => {
      calculator.printDigit('5');
      calculator.changeSign();
      calculator.changeSign();
      expect(calculator.dashboard.value).toBe('5');
    });

    it('should not change zero', () => {
      calculator.dashboard.value = '0';
      calculator.changeSign();
      expect(calculator.dashboard.value).toBe('0');
    });
  });

  describe('percentage method', () => {
    it('should be defined', () => {
      expect(calculator.percentage).toBeDefined();
    });

    it('should calculate percentage', () => {
      calculator.printDigit('5');
      calculator.printDigit('0');
      calculator.percentage();
      expect(calculator.dashboard.value).toBe('0.5');
    });

    it('should handle 100%', () => {
      calculator.printDigit('1');
      calculator.printDigit('0');
      calculator.printDigit('0');
      calculator.percentage();
      expect(calculator.dashboard.value).toBe('1');
    });
  });

  describe('squareRoot method', () => {
    it('should be defined', () => {
      expect(calculator.squareRoot).toBeDefined();
    });

    it('should calculate square root', () => {
      calculator.printDigit('1');
      calculator.printDigit('6');
      calculator.squareRoot();
      expect(calculator.dashboard.value).toBe('4');
    });

    it('should handle square root of 0', () => {
      calculator.dashboard.value = '0';
      calculator.squareRoot();
      expect(calculator.dashboard.value).toBe('0');
    });

    it('should handle negative numbers', () => {
  const clearSpy = jest.spyOn(calculator, 'clear');
  calculator.printDigit('5');
  calculator.changeSign();
  calculator.squareRoot();
  expect(clearSpy).toHaveBeenCalled();
  clearSpy.mockRestore();
});
  });

  describe('square method', () => {
    it('should be defined', () => {
      expect(calculator.square).toBeDefined();
    });

    it('should calculate square', () => {
      calculator.printDigit('5');
      calculator.square();
      expect(calculator.dashboard.value).toBe('25');
    });

    it('should handle square of 0', () => {
      calculator.dashboard.value = '0';
      calculator.square();
      expect(calculator.dashboard.value).toBe('0');
    });

    it('should handle negative square', () => {
      calculator.printDigit('3');
      calculator.changeSign();
      calculator.square();
      expect(calculator.dashboard.value).toBe('9');
    });
  });

  describe('reciprocal method', () => {
    it('should be defined', () => {
      expect(calculator.reciprocal).toBeDefined();
    });

    it('should calculate reciprocal', () => {
      calculator.printDigit('5');
      calculator.reciprocal();
      expect(calculator.dashboard.value).toBe('0.2');
    });

    it('should handle reciprocal of zero', () => {
  const clearSpy = jest.spyOn(calculator, 'clear');
  calculator.dashboard.value = '0';
  calculator.reciprocal();
  expect(clearSpy).toHaveBeenCalled();
  clearSpy.mockRestore();
});

  });

  describe('copy and paste methods', () => {
    it('copy should be defined', () => {
      expect(calculator.copy).toBeDefined();
    });

    it('paste should be defined', () => {
      expect(calculator.paste).toBeDefined();
    });

    it('should copy current value', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      calculator.copy();
      calculator.clear();
      calculator.paste();
      expect(calculator.dashboard.value).toBe('123');
    });

    it('paste should call printDigit', () => {
      const printDigitSpy = jest.spyOn(calculator, 'printDigit');
      calculator.printDigit('5');
      calculator.copy();
      calculator.clear();
      calculator.paste();
      expect(printDigitSpy).toHaveBeenCalled();
      printDigitSpy.mockRestore();
    });
  });

  describe('getValue method', () => {
    it('should be defined', () => {
      expect(calculator.getValue).toBeDefined();
    });

    it('should return current dashboard value', () => {
      calculator.printDigit('1');
      calculator.printDigit('2');
      calculator.printDigit('3');
      expect(calculator.getValue()).toBe('123');
    });
  });

  describe('Jest SpyOn demonstrations', () => {
    describe('when using spyOn to track method calls', () => {
      it('should track printDigit calls', () => {
        const printDigitSpy = jest.spyOn(calculator, 'printDigit');
        calculator.printDigit('5');
        calculator.printDigit('3');
        expect(printDigitSpy).toHaveBeenCalledTimes(2);
        expect(printDigitSpy).toHaveBeenCalledWith('5');
        expect(printDigitSpy).toHaveBeenCalledWith('3');
        printDigitSpy.mockRestore();
      });

      it('should track printAction calls', () => {
        const printActionSpy = jest.spyOn(calculator, 'printAction');
        calculator.printDigit('5');
        calculator.printAction('+');
        expect(printActionSpy).toHaveBeenCalledWith('+');
        printActionSpy.mockRestore();
      });

      it('should track calculate calls', () => {
        const calculateSpy = jest.spyOn(calculator, 'calculate');
        calculator.printDigit('5');
        calculator.printAction('+');
        calculator.printDigit('3');
        calculator.calculate();
        expect(calculateSpy).toHaveBeenCalled();
        calculateSpy.mockRestore();
      });

      it('printDigit should be called in paste', () => {
        const onSpy = jest.spyOn(calculator, 'printDigit');
        calculator.printDigit('5');
        calculator.copy();
        calculator.paste();
        expect(onSpy).toHaveBeenCalled();
        onSpy.mockRestore();
      });
    });

    describe('when using spyOn to mock implementations', () => {
      it('should mock printDigit return value', () => {
        const spy = jest.spyOn(calculator, 'printDigit').mockImplementation(() => {
          calculator.dashboard.value = '999';
        });
        calculator.printDigit('1');
        expect(calculator.dashboard.value).toBe('999');
        spy.mockRestore();
      });

      it('should mock clear method', () => {
        const clearSpy = jest.spyOn(calculator, 'clear').mockImplementation(() => {
          calculator.dashboard.value = 'CLEARED';
        });
        calculator.clear();
        expect(calculator.dashboard.value).toBe('CLEARED');
        clearSpy.mockRestore();
      });
    });

    describe('when verifying method interactions', () => {
     /* it('should verify printAction is called before calculate', () => {
        const printActionSpy = jest.spyOn(calculator, 'printAction');
        const calculateSpy = jest.spyOn(calculator, 'calculate');
        
        calculator.printDigit('5');
        calculator.printAction('+');
        calculator.printDigit('3');
        calculator.calculate();

        expect(printActionSpy).toHaveBeenCalledBefore(calculateSpy);
        
        printActionSpy.mockRestore();
        calculateSpy.mockRestore();
      });*/

      it('should verify clear resets everything', () => {
        const clearSpy = jest.spyOn(calculator, 'clear');
        
        calculator.printDigit('5');
        calculator.printAction('+');
        calculator.clear();

        expect(clearSpy).toHaveBeenCalled();
        expect(calculator.dashboard.value).toBe('0');
        expect(calculator.getCurrentAction()).toBeNull();
        
        clearSpy.mockRestore();
      });
    });
  });

  describe('Complex calculation scenarios', () => {
    it('should handle chained operations', () => {
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('3');
      calculator.printAction('*');
      calculator.printDigit('2');
      calculator.calculate();
      expect(calculator.dashboard.value).toBe('16');
    });

    it('should handle multiple decimal operations', () => {
      calculator.printDigit('3');
      calculator.printDigit('.');
      calculator.printDigit('5');
      calculator.printAction('+');
      calculator.printDigit('2');
      calculator.printDigit('.');
      calculator.printDigit('5');
      calculator.calculate();
      expect(parseFloat(calculator.dashboard.value)).toBeCloseTo(6, 1);
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      calculator.printDigit('9');
      calculator.printDigit('9');
      calculator.printDigit('9');
      calculator.printDigit('9');
      calculator.printDigit('9');
      calculator.printDigit('9');
      expect(calculator.dashboard.value).toBe('999999');
    });

    it('should handle very small decimals', () => {
      calculator.printDigit('0');
      calculator.printDigit('.');
      calculator.printDigit('0');
      calculator.printDigit('0');
      calculator.printDigit('1');
      expect(calculator.dashboard.value).toBe('0.001');
    });
  });
});
