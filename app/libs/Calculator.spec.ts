import { Calculator } from "./Calculator";

describe("Calculator class tests", () => {
  let calculator: Calculator;

  beforeEach(() => {
    document.body.innerHTML = `<input id="dashboard" class="app-result" type="text" />`;
    calculator = new Calculator();
  });

  it("should initialize with a default theme", () => {
    expect(document.body.className).toBe("theme-one");
  });

  it("should append digits correctly", () => {
    calculator.printDigit("5");
    calculator.printDigit("3");
    expect(calculator.dashboard.value).toBe("53");
  });

  it("should handle +/- action correctly", () => {
    calculator.dashboard.value = "123";
    calculator.printAction("+/-");
    expect(calculator.dashboard.value).toBe("-123");
    calculator.printAction("+/-");
    expect(calculator.dashboard.value).toBe("123");
  });

  it("should append valid actions correctly", () => {
    calculator.dashboard.value = "123";
    calculator.printAction("+");
    expect(calculator.dashboard.value).toBe("123+");
  });

  it("should not append action if the last character is already an action", () => {
    calculator.dashboard.value = "123+";
    calculator.printAction("*");
    expect(calculator.dashboard.value).toBe("123+");
  });

  it("should solve mathematical expressions", () => {
    calculator.dashboard.value = "2+3*4";
    calculator.solve();
    expect(calculator.dashboard.value).toBe("14");
  });

  it("should clear the dashboard", () => {
    calculator.dashboard.value = "123";
    calculator.clr();
    expect(calculator.dashboard.value).toBe("");
  });

  it("should toggle themes correctly", () => {
    calculator.toggleTheme();
    expect(document.body.className).toBe("theme-second");

    calculator.toggleTheme();
    expect(document.body.className).toBe("theme-one");
  });

  it("should save and paste values using localStorage", () => {
    calculator.dashboard.value = "42";
    calculator.save();
    calculator.clr();
    calculator.paste();
    expect(calculator.dashboard.value).toBe("42");
  });

  it("should handle invalid paste values gracefully", () => {
    localStorage.setItem("result", null as any); 
    calculator.paste(); 
    expect(calculator.dashboard.value).toBe(""); 
  });
});