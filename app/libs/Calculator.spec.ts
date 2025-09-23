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

});
describe("Calculator extra methods", () => {
  let calculator: Calculator;

  beforeEach(() => {
    const inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = "dashboard";
    document.body.appendChild(inputResult);

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
  });

  it("printAction '+/-' should toggle negative sign", () => {
    calculator.dashboard.value = "5";
    calculator.printAction("+/-");
    expect(calculator.dashboard.value).toBe("-5");

    calculator.printAction("+/-");
    expect(calculator.dashboard.value).toBe("5");
  });

  it("clr should reset dashboard value", () => {
    calculator.dashboard.value = "123";
    calculator.clr();
    expect(calculator.dashboard.value).toBe("");
  });

  it("setTheme should update localStorage and body class", () => {
    calculator.setTheme("theme-one");
    expect(localStorage.getItem("theme")).toBe("theme-one");
    expect(document.querySelector("body")?.className).toBe("theme-one");
  });

  it("toggleTheme should switch from theme-one to theme-second", (done) => {
    localStorage.setItem("theme", "theme-one");
    calculator.toggleTheme();
    setTimeout(() => {
      expect(localStorage.getItem("theme")).toBe("theme-second");
      expect(document.querySelector("body")?.className).toBe("theme-second");
      done();
    }, 600);
  });

  it("save should put result in localStorage", () => {
    calculator.dashboard.value = "42";
    calculator.save();
    expect(localStorage.getItem("result")).toBe("42");
  });

  it("paste should insert saved result", () => {
    localStorage.setItem("result", "99");
    calculator.paste();
    expect(calculator.dashboard.value).toBe("99");
  });
});
describe("Calculator uncovered branches", () => {
  let calculator: Calculator;

  beforeEach(() => {
    const inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = "dashboard";
    document.body.appendChild(inputResult);

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
  });

  it("printAction should do nothing if last char is operator", () => {
    calculator.dashboard.value = "7+";
    calculator.printAction("*");
    expect(calculator.dashboard.value).toBe("7+");
  });

  it("printAction should do nothing if dashboard is empty", () => {
    calculator.dashboard.value = "";
    calculator.printAction("+");
    expect(calculator.dashboard.value).toBe("");
  });

  it("solve should evaluate current dashboard expression", () => {
    calculator.dashboard.value = "6/2";
    calculator.solve();
    expect(calculator.dashboard.value).toBe("3");
  });

  it("toggleTheme should switch from theme-second to theme-one", (done) => {
    localStorage.setItem("theme", "theme-second");
    calculator.toggleTheme();
    setTimeout(() => {
      expect(localStorage.getItem("theme")).toBe("theme-one");
      expect(document.querySelector("body")?.className).toBe("theme-one");
      done();
    }, 600);
  });
});




