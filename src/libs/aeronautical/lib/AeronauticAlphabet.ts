export default class AeronauticAlphabet {
  symbol: string;
  value: string;
  guess: string;

  /**
   * Creates an instance of AeronauticAlphabet.
   * @param {string} symbol
   * @param {string} value
   * @param {string} guess
   */
  constructor(symbol: string, value: string, guess: string) {
    this.symbol = symbol;
    this.value = value;
    this.guess = "";
  }
}
