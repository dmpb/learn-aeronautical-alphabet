export interface Configuration {
  time?: number;
  finished: (result: ResultAlphabet) => void;
}

export interface DeliberyAlphabet {
  symbol: string;
}

export interface ResultAlphabet {
  success: number;
  error: number;
}
