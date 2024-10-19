import data from "../../data/patients";
import { PatientSafe, Patient, Entry } from "../types";
const patients: Patient[] = data;
export const patientsNotSensitive = (): PatientSafe[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
      };
    }
  );
};

export const addPatient = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};
export const specificPatient = (id: string): Patient | null => {
  const m: Patient | undefined = patients.find((patient) => patient.id === id);
  if (m) {
    if (!m.entries) {
      return {
        name: m.name,
        dateOfBirth: m.dateOfBirth,
        gender: m.gender,
        occupation: m.occupation,
        id: m.id,
        ssn: m.ssn,
        entries: [],
      };
    }
    return {
      name: m.name,
      dateOfBirth: m.dateOfBirth,
      gender: m.gender,
      occupation: m.occupation,
      entries: m.entries,
      ssn: m.ssn,
      id: m.id,
    };
  }
  return null;
};
export const addEntry = (id: string, entry: Entry) => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    return null;
  }
  if (patient.entries) {
    patient.entries.push(entry);
  } else {
    patient.entries = [entry];
  }
  patients.map((patiente) => (patiente.id === id ? patient : patiente));
  return patient;
};
