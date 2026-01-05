/**
 * Calculator class with DOM interaction
 * For BDD testing demonstration
 */
export class Calculator {
  public dashboard: HTMLInputElement;
  private currentValue: string = '';
  private previousValue: string = '';
  private currentAction: string | null = null;
  private clipboard: string = '';

  constructor() {
    this.dashboard = document.createElement('input');
    this.dashboard.type = 'text';
    this.dashboard.id = 'dashboard';
    this.dashboard.className = 'app-result';
    this.dashboard.value = '0';
  }

  /**
   * Print digit to dashboard
   * @param digit - Digit to print (0-9 or .)
   */
  printDigit(digit: string): void {
    if (this.dashboard.value === '0' && digit !== '.') {
      this.dashboard.value = digit;
    } else if (digit === '.' && this.dashboard.value.includes('.')) {
      return;
    } else {
      this.dashboard.value += digit;
    }
    this.currentValue = this.dashboard.value;
  }

  /**
   * Print action (+, -, *, /)
   * @param action - Mathematical action
   */
  printAction(action: string): void {
    if (this.currentValue) {
      if (this.previousValue && this.currentAction) {
        this.calculate();
      }
      this.previousValue = this.dashboard.value;
      this.currentAction = action;
      this.currentValue = '';
      this.dashboard.value = '0';
    }
  }

  /**
   * Calculate result
   */
  calculate(): void {
    if (!this.previousValue || !this.currentAction) {
      return;
    }

    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.dashboard.value);
    let result: number;

    switch (this.currentAction) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      /*case '*':
        result = prev * current;
        break;*/
      case '/':
        if (current === 0) {
          this.dashboard.value = 'Error: Division by zero';
          this.clear();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.dashboard.value = result.toString();
    this.previousValue = '';
    this.currentAction = null;
    this.currentValue = result.toString();
  }

  
   * Clear calculator
   
  clear(): void {
    this.dashboard.value = '0';
    this.currentValue = '';
    this.previousValue = '';
    this.currentAction = null;
  }

  /**
   * Clear entry (current input only)
   */
  clearEntry(): void {
    this.dashboard.value = '0';
    this.currentValue = '';
  }

  /**
   * Backspace - remove last character
   */
  backspace(): void {
    if (this.dashboard.value.length > 1) {
      this.dashboard.value = this.dashboard.value.slice(0, -1);
    } else {
      this.dashboard.value = '0';
    }
    this.currentValue = this.dashboard.value;
  }

  /**
   * Change sign (+/-)
   */
  changeSign(): void {
    const value = parseFloat(this.dashboard.value);
    if (value !== 0) {
      this.dashboard.value = (-value).toString();
      this.currentValue = this.dashboard.value;
    }
  }

  /**
   * Calculate percentage
   */
  percentage(): void {
    const value = parseFloat(this.dashboard.value);
    this.dashboard.value = (value / 100).toString();
    this.currentValue = this.dashboard.value;
  }

  /**
   * Calculate square root
   */
  squareRoot(): void {
    const value = parseFloat(this.dashboard.value);
    if (value < 0) {
      this.dashboard.value = 'Error: Negative number';
      this.clear();
      return;
    }
    this.dashboard.value = Math.sqrt(value).toString();
    this.currentValue = this.dashboard.value;
  }

  /**
   * Calculate square
   */
  square(): void {
    const value = parseFloat(this.dashboard.value);
    this.dashboard.value = (value * value).toString();
    this.currentValue = this.dashboard.value;
  }

  /**
   * Calculate reciprocal (1/x)
   */
  reciprocal(): void {
    const value = parseFloat(this.dashboard.value);
    if (value === 0) {
      this.dashboard.value = 'Error: Division by zero';
      this.clear();
      return;
    }
    this.dashboard.value = (1 / value).toString();
    this.currentValue = this.dashboard.value;
  }

  /**
   * Copy value to clipboard
   */
  copy(): void {
    this.clipboard = this.dashboard.value;
  }

  /**
   * Paste value from clipboard
   */
  paste(): void {
    if (this.clipboard) {
      this.printDigit(this.clipboard);
    }
  }

  /**
   * Get current display value
   */
  getValue(): string {
    return this.dashboard.value;
  }

  /**
   * Get current action
   */
  getCurrentAction(): string | null {
    return this.currentAction;
  }

  /**
   * Get previous value
   */
  getPreviousValue(): string {
    return this.previousValue;
  }
}

export default Calculator;

/*123*/