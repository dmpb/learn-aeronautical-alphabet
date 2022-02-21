import {
  Configuration,
  DeliberyAlphabet,
  ResultAlphabet,
} from "./lib/Interfaces";
import AeronauticAlphabet from "./lib/AeronauticAlphabet";

class Aeronautical {
  private alphabets: Array<AeronauticAlphabet>;
  private time: number;
  private timeCounter: number;
  private timer: any;
  private step: number;
  private finished: (result: any) => void;
  private ended: boolean;

  /**
   * Creates an instance of Aeronautical.
   */
  constructor(config: Configuration) {
    this.time = config.time ? config.time : 60000;
    this.finished = config.finished;
    this.timeCounter = 0;
    this.alphabets = this.listAlphabet();
    this.step = 0;
    this.ended = true;
  }
  /**
   * Iniciar el juego
   *
   * @return {*}  {DeliberyAlphabet}
   */
  public play(): DeliberyAlphabet {
    if (this.ended === true) {
      this.ended = false;
      this.setInterval();
    } else {
      this.stop();
    }

    return {
      symbol: this.alphabets[this.step].symbol,
    };
  }
  /**
   * Parar el juego
   *
   * @private
   */
  private stop() {
    // Parar el intervalo
    clearInterval(this.timer);
    // Obtener el resultado de la validación
    const result = this.validate();
    // Resetear todos los valores
    this.ended = true;
    this.timeCounter = 0;
    this.alphabets = this.listAlphabet();
    this.step = 0;
    // Accionar el callback de finalización
    this.finished(result);
  }
  /**
   * Establecer el intervalo de tiempo
   *
   * @private
   */
  private setInterval() {
    this.timer = setInterval(() => {
      this.timeCounter += 1000;

      // Stop the interval
      if (this.timeCounter >= this.time) {
        this.stop();
      }
    }, 1000);
  }
  /**
   * Pasar el siguiente alfabeto
   *
   * @param {string} value
   * @return {*}  {DeliberyAlphabet}
   */
  public next(value: string): DeliberyAlphabet {
    let symbol = "";

    if (this.ended === false) {
      // Guardar respuesta
      if (this.alphabets[this.step]) {
        this.alphabets[this.step].guess = value;
      }
      // Pasar al siguiente
      this.step += 1;

      if (this.alphabets[this.step]) {
        symbol = this.alphabets[this.step].symbol;
      } else {
        // Finalizar si no hay mas alfabetos
        this.stop();
      }
    }

    return {
      symbol: symbol,
    };
  }
  /**
   * Validar la lista de aeronautic
   *
   * @private
   * @return {*}  {ResultAlphabet}
   */
  private validate(): ResultAlphabet {
    let success = 0;
    let error = 0;

    this.alphabets.map((alphabet) => {
      const value = alphabet.value;
      const guess = alphabet.guess;

      if (value === guess) {
        success += 1;
      } else {
        error += 1;
      }
    });

    return {
      success,
      error,
    };
  }

  /**
   * Retornar lista de alfabetos admitidos
   *
   * @private
   * @return {*}  {Array<AeronauticAlphabet>}
   * @memberof Aeronautical
   */
  private listAlphabet(): Array<AeronauticAlphabet> {
    return [
      new AeronauticAlphabet("a", "alfa", ""),
      new AeronauticAlphabet("b", "bravo", ""),
    ];
  }
}

export default Aeronautical;
