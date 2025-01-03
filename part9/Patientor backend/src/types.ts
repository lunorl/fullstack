export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
interface Discharge {
  date: string;
  criteria: string;
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}
export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type PatientSafe = Omit<Patient, "ssn">;
export type PatientAdd = Omit<Patient, "id">;
