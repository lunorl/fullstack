import express from "express";
import { Response, Request } from "express";
import {
  PatientSafe,
  Gender,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { v1 as uuid } from "uuid";
import {
  addEntry,
  addPatient,
  patientsNotSensitive,
  specificPatient,
} from "../services/patientService";
import { z } from "zod";
import { HealthCheckRating } from "../types";
const patient = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  id: z.string(),
});

const router = express.Router();

router.get("/", (_req, res: Response<PatientSafe[]>) => {
  res.send(patientsNotSensitive());
});
router.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("HELLO", req.body);
    const guy = patient.parse({ ...req.body, id: uuid() });
    console.log(guy);
    res.send(addPatient(guy));
})
router.get("/:id", (req: Request<{ id: string }>, res) => {
  const s: string = req.params.id;
  res.json(specificPatient(s));
});
const HealthCheck = z.object({
  type: z.literal("HealthCheck"),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});
const Hospital = z.object({
  type: z.literal("Hospital"),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});
const OccupationalHealthcare = z.object({
  type: z.literal("OccupationalHealthcare"),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
  employerName: z.string(),
});
router.post(
  "/:id/entries",
  (
    req: Request<
      { id: string },
      unknown,
      HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry
    >,
    res
  ) => {
    const id = req.params.id;
    let entry: Entry;
    if (req.body.type === "HealthCheck") {
      const m = HealthCheck.parse({ ...req.body });
      entry = { ...m, id: uuid() };
    } else if (req.body.type === "Hospital") {
      const m = Hospital.parse({ ...req.body });
      entry = { ...m, id: uuid() };
    } else if (req.body.type === "OccupationalHealthcare") {
      const m = OccupationalHealthcare.parse({ ...req.body });
      entry = { ...m, id: uuid() };
    } else {
      throw new Error("the type is not correct");
    }
    res.send(addEntry(id, entry));
  }
);

export default router;
