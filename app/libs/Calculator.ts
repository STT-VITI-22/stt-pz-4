import { evaluate } from 'mathjs';



export class Calculator {

  actions: Array<string> = ['+', '-', '*', '/', '.', '%'];
  dashboard: HTMLInputElement;

  //constructor
  constructor() {
    let dashboardElement = document.getElementById("dashboard") as HTMLInputElement;
    if (!dashboardElement) {
      dashboardElement = document.createElement('input');
      dashboardElement.type = 'text';
      dashboardElement.id = 'dashboard';
      dashboardElement.className = 'app-result';
      document.body.appendChild(dashboardElement);
    }
    this.dashboard = dashboardElement;
    this.setTheme('theme-one');
  }



  printAction(val: string): void {
    const lastChar = this.dashboard.value[this.dashboard.value.length - 1];

    if (val === '+/-') {
      if (this.dashboard.value.startsWith('-')) {
        this.dashboard.value = this.dashboard.value.slice(1);
      } else {
        this.dashboard.value = '-' + this.dashboard.value;
      }
    } else if (!this.actions.includes(lastChar) && this.dashboard.value.length > 0) {
      this.dashboard.value += val;
    }
  }

  printDigit(val: string): void {
    this.dashboard.value += val;
  }

  solve(): void {
    try {
      const expression = this.dashboard.value;
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
    let theme = localStorage.getItem('theme') || 'theme-one';

    if (theme === 'theme-one') {
      theme = 'theme-second';
    } else {
      theme = 'theme-one';
    }

    this.setTheme(theme);
  }

  // save(): void {
  //   localStorage.setItem('result', this.dashboard.value);
  // }

  paste(): void {
    const result = localStorage.getItem('result');
    if (result) {
      this.printDigit(result);
    }
  }


}




