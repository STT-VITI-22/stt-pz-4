import { Calculator } from './Calculator';
import { evaluate } from 'mathjs';

jest.mock('mathjs', () => ({
    evaluate: jest.fn(),
}));

describe('Test suite for Calculator.ts (BDD - Maximum Coverage)', () => {
    let calculator: Calculator;
    let inputResult: HTMLInputElement;
    let bodyMock: { className: string };

    beforeAll(() => {
        const localStorageMock = (() => {
            let store: { [key: string]: string } = {};
            return {
                getItem: jest.fn((key) => store[key] || null),
                setItem: jest.fn((key, value) => { store[key] = value.toString() }),
                clear: jest.fn(() => { store = {} }),
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        bodyMock = { className: '' };
        document.querySelector = jest.fn((selector) => {
            if (selector === 'body') return bodyMock;
            return null;
        }) as jest.Mock;

        inputResult = document.createElement("input") as HTMLInputElement;
        inputResult.type = "text";
        inputResult.id = 'dashboard';
        
        document.getElementById = jest.fn((id) => {
            if (id === 'dashboard') return inputResult;
            return null;
        }) as jest.Mock;

        calculator = new Calculator();
        (localStorage.getItem as jest.Mock).mockClear(); 
    });

    beforeEach(() => {
        calculator.dashboard.value = '';
        jest.clearAllMocks(); 
        jest.useFakeTimers(); 
    });

    describe('printDigit method', () => {
        it('should append a new digit value to the dashboard', () => {
            calculator.printDigit('1');
            calculator.printDigit('2');
            expect(calculator.dashboard.value).toBe('12');
        });
    });

    describe('printAction method', () => {
        it('should prepend a minus sign when "+/-" is pressed and the dashboard value is positive (10 -> -10)', () => {
            calculator.dashboard.value = '10';
            calculator.printAction('+/-');
            expect(calculator.dashboard.value).toBe('-10');
        });

        it('should remove the minus sign when "+/-" is pressed and the dashboard value is negative (-20 -> 20)', () => {
            calculator.dashboard.value = '-20';
            calculator.printAction('+/-');
            expect(calculator.dashboard.value).toBe('20');
        });

        it('should not add a minus sign if dashboard is empty when "+/-" is pressed (0 -> 0)', () => {
            calculator.dashboard.value = '';
            calculator.printAction('+/-');
            expect(calculator.dashboard.value).toBe('');
        });

        it('should not add an action if the last character is already an action (e.g., trying to add "+" to "5*")', () => {
            calculator.dashboard.value = '5*';
            calculator.printAction('+');
            expect(calculator.dashboard.value).toBe('5*');
        });

        it('should not add an action if the dashboard is empty', () => {
            calculator.dashboard.value = '';
            calculator.printAction('+');
            expect(calculator.dashboard.value).toBe('');
        });

        it('should append a valid action to the dashboard (e.g., "+")', () => {
            calculator.dashboard.value = '5';
            calculator.printAction('+');
            expect(calculator.dashboard.value).toBe('5+');
        });
        
        it('should correctly append a decimal point "."', () => {
            calculator.dashboard.value = '12';
            calculator.printAction('.');
            expect(calculator.dashboard.value).toBe('12.');
        });

        it('should start with "0." if "." is pressed on an empty dashboard', () => {
            calculator.dashboard.value = '';
            calculator.printAction('.');
            expect(calculator.dashboard.value).toBe('0.');
        });
    });

    describe('solve method', () => {
        it('should call mathjs.evaluate with the dashboard expression and update the dashboard', () => {
            (evaluate as jest.Mock).mockReturnValue(42); 
            calculator.dashboard.value = '21*2';
            calculator.solve();
            
            expect(evaluate).toHaveBeenCalledWith('21*2');
            expect(calculator.dashboard.value).toBe('42'); 
        });
    });

    describe('clr method', () => {
        it('should clear the dashboard value', () => {
            calculator.dashboard.value = '999';
            calculator.clr();
            expect(calculator.dashboard.value).toBe('');
        });
    });

    describe('save and paste methods', () => {
        it('save should store the dashboard value in localStorage', () => {
            calculator.dashboard.value = '101';
            calculator.save();
            expect(localStorage.setItem).toHaveBeenCalledWith('result', '101');
        });

        it('paste should retrieve the result from localStorage and call printDigit', () => {
            (localStorage.getItem as jest.Mock).mockReturnValue('202');
            const printDigitSpy = jest.spyOn(calculator, 'printDigit');

            calculator.paste();
            
            expect(localStorage.getItem).toHaveBeenCalledWith('result');
            expect(printDigitSpy).toHaveBeenCalledWith('202');
        });
        
        it('paste should call printDigit with null if nothing is in localStorage', () => {
            (localStorage.getItem as jest.Mock).mockReturnValue(null);
            const printDigitSpy = jest.spyOn(calculator, 'printDigit');

            calculator.paste();
            
            expect(printDigitSpy).toHaveBeenCalledWith(null);
        });
    });
    
    describe('theme methods', () => {
        const themeOne = 'theme-one';
        const themeSecond = 'theme-second';
        
        it('setTheme should update localStorage and body class', () => {
            calculator.setTheme('dark-mode');
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark-mode');
            expect(bodyMock.className).toBe('dark-mode');
        });

        it('toggleTheme should switch from theme-one to theme-second after a delay', () => {
            (localStorage.getItem as jest.Mock).mockReturnValue(themeOne);
            const setThemeSpy = jest.spyOn(calculator, 'setTheme');
            
            calculator.toggleTheme();
            jest.advanceTimersByTime(500); 
            
            expect(setThemeSpy).toHaveBeenCalledWith(themeSecond);
        });

        it('toggleTheme should switch from theme-second to theme-one after a delay', () => {
            (localStorage.getItem as jest.Mock).mockReturnValue(themeSecond);
            const setThemeSpy = jest.spyOn(calculator, 'setTheme');
            
            calculator.toggleTheme();
            jest.advanceTimersByTime(500);
            
            expect(setThemeSpy).toHaveBeenCalledWith(themeOne);
        });
  
        it('toggleTheme should default to theme-one if the theme is undefined (or null) in localStorage', () => {
            (localStorage.getItem as jest.Mock).mockReturnValue(null);
            const setThemeSpy = jest.spyOn(calculator, 'setTheme');
            
            calculator.toggleTheme();
            jest.advanceTimersByTime(500);
            
            expect(setThemeSpy).toHaveBeenCalledWith(themeOne); 
        });
    });
});