import { Diagnosis } from "../types";
import data from "../../data/diagnoses";
const diagnoses: Diagnosis[] = data;
export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
export const specificDiagnoses = (code: string): Diagnosis | undefined => {
  return diagnoses.find((d) => d.code === code);
};
