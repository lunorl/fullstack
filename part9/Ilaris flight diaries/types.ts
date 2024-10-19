import { z } from "zod";
import { newEntry } from "./src/utils";
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export type NewDiaryEntry = z.infer<typeof newEntry>;
