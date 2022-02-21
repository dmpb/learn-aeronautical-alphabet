import "./assets/css/main.css";
import Aeronoutical from "./libs/aeronautical";

const play = <HTMLElement>document.getElementById("play");
const input = <HTMLInputElement>document.getElementById("input");
const next = <HTMLElement>document.getElementById("next");

const aeronautical = new Aeronoutical({
  time: 60000,
  finished: (result) => {
    console.log("finished");
    console.log(result);
  },
});

play.addEventListener("click", () => {
  const alphabet = aeronautical.play();

  console.log(alphabet);
});

next.addEventListener("click", () => {
  const value = input.value;

  const alphabet = aeronautical.next(value);

  console.log(alphabet);
});
