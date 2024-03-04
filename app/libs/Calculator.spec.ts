import { Calculator } from "./Calculator";

describe("Test suite for Calculator.ts", () => {
  let calculator;
  beforeAll(() => {
    let inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = "dashboard";
    inputResult.className = "app-result";

    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  it("printDigit should to be defined", () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it("printDigit should add new value", () => {
    calculator.printDigit("5");
    calculator.printDigit("5");
    expect(calculator.dashboard.value).toBe("55");
  });

  it("printDigit should to be call in calculator.paste", () => {
    const onSpy = jest.spyOn(calculator, "printDigit");
    calculator.paste();
    expect(onSpy).toHaveBeenCalled();
  });

  it("printAction should to be defined", () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('printAction should update value correctly for "+/-"', () => {
    calculator.dashboard.value = "123";
    calculator.printAction("+/-");
    expect(calculator.dashboard.value).toBe("-123");
  });

  it('printAction should update value correctly for "+/-"', () => {
    calculator.dashboard.value = "-123";
    calculator.printAction("+/-");
    expect(calculator.dashboard.value).toBe("123");
  });

  it("printAction should append the value if last character is not an action", () => {
    calculator.dashboard.value = "511";
    calculator.printAction("+");
    expect(calculator.dashboard.value).toBe("511+");
  });

  it("printAction should append the value if last character is not an action", () => {
    calculator.dashboard.value = "511";
    calculator.printAction("-");
    expect(calculator.dashboard.value).toBe("511-");
  });

  it("solve should evaluate the expression and update the value", () => {
    calculator.dashboard.value = "2+10";
    calculator.solve();
    expect(calculator.dashboard.value).toBe("12");
  });

  it("solve should evaluate the expression and update the value", () => {
    calculator.dashboard.value = "20-10";
    calculator.solve();
    expect(calculator.dashboard.value).toBe("10");
  });

  it("printAction should not append the value if last character is an action", () => {
    calculator.dashboard.value = "987+";
    calculator.printAction("-");
    expect(calculator.dashboard.value).toBe("987+");
  });

  it("printDigit should append the digit to the value", () => {
    calculator.dashboard.value = "456";
    calculator.printDigit("7");
    expect(calculator.dashboard.value).toBe("4567");
  });

  test("toggleTheme should switch between themes and apply the new theme after a delay", () => {
    // Arrange
    const themeOne = "theme-one";
    const themeSecond = "theme-second";
    expect(localStorage.getItem("theme")).toBe(themeOne);
    calculator.toggleTheme();
    // Assert
    jest.advanceTimersByTime(500); // Пройти час вперед на 500 мс
    expect(localStorage.getItem("theme")).toBe(themeOne);
    expect(document.querySelector("body").className).toBe(themeOne);
  });

  it("clr should clear the value", () => {
    calculator.dashboard.value = "239";
    calculator.clr();
    expect(calculator.dashboard.value).toBe("");
  });

  it("set theme-one", () => {
    const themeName = "theme-one";
    calculator.setTheme(themeName);
    expect(localStorage.getItem("theme")).toBe(themeName);
    expect(document.querySelector("body").className).toBe(themeName);
  });

  it("set theme-second", () => {
    const themeName = "theme-second";
    calculator.setTheme(themeName);
    expect(localStorage.getItem("theme")).toBe(themeName);
    expect(document.querySelector("body").className).toBe(themeName);
  });

  it("save should store the current result in localStorage", () => {
    calculator.dashboard.value = "143";
    calculator.save();
    expect(localStorage.getItem("result")).toBe("143");
    calculator.clr();
  });

  it("paste should append the stored result to the value", () => {
    localStorage.setItem("result", "456");
    calculator.paste();
    expect(calculator.dashboard.value).toBe("456");
  });
});
