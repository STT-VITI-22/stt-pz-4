import { evaluate } from 'mathjs'

export class Calculator {

  actions: Array<string> = ['+', '-', '*', '/', '.', '%'];
  dashboard: HTMLInputElement;

  //constructor
  constructor() {
    this.dashboard = document.getElementById("dashboard") as HTMLInputElement;
    this.setTheme('theme-one');
  }

  printAction(val: string): void {
    if (val === '+/-') {
      let firstDigit = this.dashboard.value[0]
      if (firstDigit === '-') {
        this.dashboard.value = this.dashboard.value.slice(1, this.dashboard.value.length)
      } else {
        this.dashboard.value = '-' + this.dashboard.value
      }
    } else if (this.dashboard.value.length === 0) {
      return
    } else if (this.actions.includes(this.dashboard.value[this.dashboard.value.length - 1])) {
      return
    } else {
      this.dashboard.value += val
    }
  }

  printDigit(val: string) {
    this.dashboard.value += val
  }

  solve() {
  let expression = this.dashboard.value
  // this.showConsoleLog(expression);
  this.dashboard.value = evaluate(expression)
}

  clr() {
    this.dashboard.value = ''
    this.dashboard.focus()
  }

  setTheme(themeName: string) {
    localStorage.setItem('theme', themeName);
    document.querySelector('body')!.className = themeName;
  }

  toggleTheme() {
    let theme = localStorage.getItem('theme');

    if (theme === 'theme-second') {
      theme = 'theme-one'
    } else if (theme === 'theme-one') {
      theme = 'theme-second'
    }
    setTimeout(() => {
      this.setTheme(theme!);
    }, 500)
  }

  save() {
    localStorage.setItem('result', this.dashboard.value);
  }

  paste() {
    const saved = localStorage.getItem('result');
    if (saved) this.printDigit(saved);
  }
}