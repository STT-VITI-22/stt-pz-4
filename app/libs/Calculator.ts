import { evaluate } from "mathjs";

export class Calculator {
  actions: Array<string> = ["+", "-", "*", "/", ".", "%"];
  dashboard: HTMLInputElement;

  constructor() {
    this.dashboard = document.getElementById("dashboard") as HTMLInputElement;
    this.setTheme("theme-one");
  }

  printAction(val: string): void {
    if (val === "+/-") {
      let firstDigit = this.dashboard.value[0];
      if (firstDigit === "-") {
        this.dashboard.value = this.dashboard.value.slice(1);
      } else {
        this.dashboard.value = "-" + this.dashboard.value;
      }
    } else if (
      this.actions.includes(
        this.dashboard.value[this.dashboard.value.length - 1]
      ) ||
      this.dashboard.value.length === 0
    ) {
    } else {
      this.dashboard.value += val;
    }
  }

  printDigit(val: string): void {
    this.dashboard.value += val;
  }

  solve(): void {
    try {
      let expression = this.dashboard.value;
      this.dashboard.value = evaluate(expression).toString();
    } catch {
      this.dashboard.value = "Error";
    }
  }

  clr(): void {
    this.dashboard.value = "";
  }

  setTheme(themeName: string): void {
    localStorage.setItem("theme", themeName);
    document.querySelector("body")!.className = themeName;
  }

  toggleTheme(): void {
    let theme = localStorage.getItem("theme");
    theme = theme === "theme-second" ? "theme-one" : "theme-second";
    this.setTheme(theme);
  }

  save(): void {
    localStorage.setItem("result", this.dashboard.value);
  }

  paste(): void {
    const result = localStorage.getItem("result");
    this.dashboard.value = result === "null" ? "" : result;
  }
}