export interface Configuration {
  time?: number;
  finished: (result: any) => void;
}

export interface DeliberyAlphabet {
  symbol: string;
}
