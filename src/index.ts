import "./assets/css/main.css";
import Aeronoutical from "./libs/aeronautical";

// Obtener los elemntos HTML
const play = <HTMLButtonElement>document.getElementById("play");
const letter = <HTMLElement>document.getElementById("letter");
const input = <HTMLInputElement>document.getElementById("input");
const next = <HTMLButtonElement>document.getElementById("next");
const success = <HTMLElement>document.getElementById("success");
const error = <HTMLElement>document.getElementById("error");
const resultContainer = <HTMLElement>document.getElementById("result");

// Establecer la instancia
const aeronautical = new Aeronoutical({
  // Establece el tiempo de intervalo del juego
  time: 60000, // 1 minuto
  // Callback que se ejecuta cuando el juego a finalizado
  finished: (result) => {
    console.log("finished");
    success.innerHTML = result.success.toString();
    error.innerHTML = result.error.toString();
    resultContainer.style.display = "block";
    play.disabled = false;
    input.disabled = true;
    next.disabled = true;
  },
});

// Evento para iniciar el juego
play.addEventListener("click", () => {
  const alphabet = aeronautical.play();

  letter.innerHTML = alphabet.symbol;
  resultContainer.style.display = "none";
  play.disabled = true;
  input.disabled = false;
  next.disabled = false;
});

// Evento para pasar al siguiente letra
next.addEventListener("click", () => {
  const value = input.value;
  const alphabet = aeronautical.next(value);

  input.value = "";
  letter.innerHTML = alphabet.symbol;
});
