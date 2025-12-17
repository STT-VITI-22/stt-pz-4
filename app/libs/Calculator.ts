// Calculator.ts — тепер має метод squareRoot
export class Calculator {
  public dashboard!: HTMLInputElement;

  private memoryKey = 'calcMemory';
  private themeKey = 'theme';

  printDigit(digit: string): void {
    if (!/[0-9.]/.test(digit)) return;

    const current = this.dashboard.value;

    if (current === '' || current === '0') {
      this.dashboard.value = current + digit;
      return;
    }
 
    if (digit === '.') {
      const lastNum = current.split(/[\+\-\*\/]/).pop() || '';
      if (lastNum.includes('.')) return;
    }
    this.dashboard.value += digit;
  }

  printAction(action: string): void {
    if (action === '+/-') {
      this.toggleSign();
      return;
    }

    const val = this.dashboard.value.trim();
    if (val === '' || /[\+\-\*\/]$/.test(val)) return;

    this.dashboard.value += action;
  }

  private toggleSign(): void {
    let val = this.dashboard.value;

    if (val === '' || val === '0') {
      this.dashboard.value = '-0';
      return;
    }

    const match = val.match(/^(.+[\+\-\*\/])?(-?)(\d.*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const sign = match[2];
    const num = match[3];

    this.dashboard.value = sign === '-' ? prefix + num : prefix + '-' + num;
  }

  solve(): void {
    let expr = this.dashboard.value.trim();

    if (!expr || /[\+\-\*\/]$/.test(expr)) return;

    try {
      expr = expr.replace(/×/g, '*').replace(/÷/g, '/');

      const result = new Function(`return ${expr}`)();

      this.dashboard.value = Number(result.toFixed(10)).toString();
    } catch (e) {
      this.dashboard.value = 'Error';
    }      
  }

  clr(): void {
    this.dashboard.value = '';
  }

  save(): void {
    localStorage.setItem(this.memoryKey, this.dashboard.value);
  }

  paste(): void {
    const saved = localStorage.getItem(this.memoryKey);

    if (saved === null) {
      this.dashboard.value += 'null';
      return;
    }

    this.dashboard.value = '';
    this.printDigit(saved);
  }

  toggleTheme(): void {
    let current = localStorage.getItem(this.themeKey) || 'theme-one';
    const next = current === 'theme-one' ? 'theme-second' : 'theme-one';

    localStorage.setItem(this.themeKey, next);
    document.body.classList.remove('theme-one', 'theme-second');
    document.body.classList.add(next);
  }

  // ✅
  public squareRoot(): void {
    const val = this.dashboard.value.trim();

    if (val === '' || isNaN(Number(val))) {
      this.dashboard.value = 'Error';
      return;
    }

    const num = Number(val);
    if (num < 0) {
      this.dashboard.value = 'Error';
      return;
    }

    const result = Math.sqrt(num);
    this.dashboard.value = Number(result.toFixed(10)).toString();
  }
}
