import diaryData from "../../data/entries";
import { NewDiaryEntry, DiaryEntry } from "../../types";
import { 
  NonSensitiveDiaryEntry,
} from "../../types";

const diaries: DiaryEntry[] = diaryData;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};
const addDiary = (
  entry: NewDiaryEntry
): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};
const getEntries = (): DiaryEntry[] => {
  return diaries;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
