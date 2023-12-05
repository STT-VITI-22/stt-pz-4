import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });
import {Calculator} from './Calculator';
import {JSDOM} from "jsdom";
import * as path from "path";
import * as fs from "fs";

describe('Test suite for Calculator.ts', () => {
  let calculator;
  let dom;
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    calculator = new Calculator();
    calculator.dashboard = dom.window.document.querySelector('[data-test="dashboard"]');
  });
  afterEach(() => {
    calculator.clr(); // Clear the dashboard after each test
  });

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

  it('printAction should to be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('printDigit should add number 7 to the display', () => {
    const buttonSeven = dom.window.document.querySelector('[data-test="btn-7"]') as HTMLElement;
    buttonSeven.click()
    expect(calculator.dashboard.value).toBe('7');
  });

  it('solve() should evaluate the expression correctly', () => {
    calculator.dashboard.value = '2+2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('4');
  });

  it('solve() should handle invalid expressions', () => {
    calculator.dashboard.value = 'invalid-expression';
    calculator.solve();
    expect(calculator.dashboard.value).toBe(''); //
  });

  it('clr() should clear the calculator display', () => {
    calculator.dashboard.value = '123';
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });


  it('save() should save the current value to local storage', () => {
    calculator.dashboard.value = '12345';
    calculator.save();
    const savedValue = localStorage.getItem('result');
    expect(savedValue).toBe('12345');
  });

  it('paste() should paste the saved value from local storage', () => {
    localStorage.setItem('result', '9876');
    calculator.paste();
    expect(calculator.dashboard.value).toBe('9876');
  });

  it('printDigit should add numbers to the display', () => {
    calculator.printDigit('5');
    calculator.printDigit('6');
    calculator.printDigit('7');

    expect(calculator.dashboard.value).toBe('567');
  });

  it('printDigit should not allow multiple leading zeros', () => {
    calculator.printDigit('0');
    calculator.printDigit('0');
    calculator.printDigit('1');

    expect(calculator.dashboard.value).toBe('1');
  });

  it('printDigit should allow zero as the first digit followed by a decimal point', () => {
    calculator.printDigit('0');
    calculator.printDigit('.');

    expect(calculator.dashboard.value).toBe('0.');
  });

  it('printDigit should handle consecutive decimal points properly', () => {
    calculator.printDigit('1');
    calculator.printDigit('.');
    calculator.printDigit('.');
    calculator.printDigit('2');

    expect(calculator.dashboard.value).toBe('1.2');
  });

});


