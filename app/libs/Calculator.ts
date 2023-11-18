import { evaluate } from 'mathjs';

export class Calculator {
  actions: Array<string> = ['+', '-', '*', '/', '.', '%'];
  dashboard: HTMLInputElement;

  // constructor
  constructor() {
    this.dashboard = document.getElementById("dashboard") as HTMLInputElement;
    this.setTheme('theme-one');
  }

  printAction(val: string): void {
    if (val === '+/-') {
      let firstDigit = this.dashboard.value[0];
      if (firstDigit === '-') {
        this.dashboard.value = this.dashboard.value.slice(1);
      } else {
        this.dashboard.value = '-' + this.dashboard.value;
      }
    } else if (
      this.actions.includes(
        this.dashboard.value[this.dashboard.value.length - 1]
      ) ||
      this.dashboard.value.length === 0
    ) {
      // Якщо останній символ - це операція або довжина дашборду 0, нічого не робимо
    } else {
      this.dashboard.value += val;
    }
  }

  printDigit(val: string) {
    this.dashboard.value += val;
  }

  printDot() {
    const lastChar = this.dashboard.value[this.dashboard.value.length - 1];
    if (!lastChar || !this.actions.includes(lastChar)) {
        this.dashboard.value += '.';
    }
  }

  printPercentage() {
    const currentValue = parseFloat(this.dashboard.value);

  if (!isNaN(currentValue)) {
    this.dashboard.value = String(currentValue / 100);
  }
  }

  toggleSign() {
    if (this.dashboard.value !== '' && this.dashboard.value !== '0' && !this.actions.includes(this.dashboard.value[this.dashboard.value.length - 1])) {
      const currentValue = parseFloat(this.dashboard.value);
      this.dashboard.value = String(-currentValue);
  }
  }

  solve() {
    let expression = this.dashboard.value;

    if (expression.trim() !== '') {
      this.dashboard.value = String(evaluate(expression));
    }
  }

  clear() {
   
    this.dashboard.value = '';
    this.actions.length = 0;
  }

  setTheme(themeName: string) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  toggleTheme() {
    let theme = localStorage.getItem('theme');

    if (theme === 'theme-second') {
      theme = 'theme-one';
    } else if (theme === 'theme-one') {
      theme = 'theme-second';
    }
    setTimeout(() => {
      this.setTheme(theme);
    }, 500);
  }

  save() {
    localStorage.setItem('result', this.dashboard.value);
  }

  paste() {
    this.printDigit(localStorage.getItem('result'));
  }
}