import { evaluate } from 'mathjs';

export class Calculator {
  actions: Array<string> = ['+', '-', '*', '/', '.', '%'];
  dashboard: HTMLInputElement;

  constructor() {
    this.dashboard = document.getElementById("dashboard") as HTMLInputElement;
    this.setTheme(localStorage.getItem('theme') || 'theme-one');
  }

  printAction(val: string): void {
    if (val === '+/-') {
      this.dashboard.value = this.dashboard.value[0] === '-' 
        ? this.dashboard.value.slice(1) 
        : '-' + this.dashboard.value;
    } else if (!this.actions.includes(this.dashboard.value[this.dashboard.value.length - 1])
               && this.dashboard.value.length !== 0) {
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
    } catch (error) {
      this.dashboard.value = 'Error';
    }
  }

  clr(): void {
    this.dashboard.value = '';
  }

  setTheme(themeName: string): void {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
  }

  toggleTheme(): void {
    let theme = localStorage.getItem('theme');
    theme = theme === 'theme-second' ? 'theme-one' : 'theme-second';
    setTimeout(() => {
      this.setTheme(theme);
    }, 500);
  }

  save(): void {
    localStorage.setItem('result', this.dashboard.value);
  }

  paste(): void {
    const savedResult = localStorage.getItem('result');
    if (savedResult) {
      this.printDigit(savedResult);
    }
  }
}