import Aeronautical from "../src/libs/aeronautical";

function letterList(): string[] {
  return [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
}

function successfulList(): string[] {
  return [
    "alfa",
    "bravo",
    "charlie",
    "delta",
    "echo",
    "foxtrot",
    "golf",
    "hotel",
    "india",
    "juliett",
    "kilo",
    "lima",
    "mike",
    "november",
    "oscar",
    "papa",
    "quebec",
    "romeo",
    "sierra",
    "tango",
    "uniform",
    "victor",
    "whiskey",
    "x-ray",
    "yankee",
    "zulu",
  ];
}

describe("Aeronautical class", () => {
  it("should start the game", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");

    const result = jest.fn();

    const aeronautical = new Aeronautical({
      finished: result,
    });

    const play = aeronautical.play();

    // Verificar si se ha iniciado un intervalo
    expect(setInterval).toHaveBeenCalledTimes(1);
    // Verificar si se ha finalizado el intervalo
    jest.advanceTimersByTime(60000);
    expect(result).toBeCalled();
    // Verificar si play a retornado un simbolo
    expect(play).toEqual({
      symbol: "a",
    });
  });

  it("should pass the next iteration", () => {
    jest.useFakeTimers();

    const aeronautical = new Aeronautical({
      finished: jest.fn(),
    });
    aeronautical.play();

    // Verficar si pasa a la siguiente letra
    for (let i = 1; i < 25; i++) {
      const letter = letterList()[i];
      const next = aeronautical.next("value");

      expect(next).toEqual({
        symbol: letter,
      });
    }
  });

  it("should validate all the result satisfactorily", () => {
    jest.useFakeTimers();

    const aeronautical = new Aeronautical({
      finished: callback,
    });
    aeronautical.play();

    for (let i = 0; i < 26; i++) {
      const letter = successfulList()[i];

      aeronautical.next(letter);
    }

    function callback(result: any) {
      expect(result).toEqual({
        success: 26,
        error: 0,
      });
    }

    jest.advanceTimersByTime(60000);
  });

  it("should validate with 23 errors and 3 successful", () => {
    jest.useFakeTimers();

    const aeronautical = new Aeronautical({
      finished: (result) => {
        console.log("resultsdasdf");

        expect(result).toEqual({
          success: 3,
          error: 23,
        });
      },
    });
    aeronautical.play();

    for (let i = 0; i < 3; i++) {
      const letter = successfulList()[i];

      aeronautical.next(letter);
    }

    jest.advanceTimersByTime(60000);
  });
});
