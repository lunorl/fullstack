export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export interface Entry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  
}
export interface NewEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string
}