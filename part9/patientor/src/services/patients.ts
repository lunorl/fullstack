import axios from "axios";
import { Diagnosis, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import { ZodError } from "zod";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const specificId = async (id: string): Promise<Patient> => {
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
};
const specificCode = async (code: string): Promise<Diagnosis> => {
  const { data } = await axios.get(`${apiBaseUrl}/diagnosis/${code}`);
  return data;
};
const postEntry = async (
  id: string,
  entry: NewEntry,
  setError: (error: string) => void
) => {
  try {
    const { data } = await axios.post(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );
    return data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const errorMessage =
        responseData?.error || "An unknown Axios error occurred";

      if (Array.isArray(responseData?.error)) {
        const formattedError = responseData.error
          .map((n: { message: string }) => n.message)
          .join(", ");
        setError("Error: " + formattedError);
      } else {
        setError("Error: " + errorMessage);
      }
    } else if (error instanceof ZodError) {
      const errorMessage =
        error.errors.map((e) => e.message).join(", ") || "Validation failed";
      setError("Validation Error: " + errorMessage);
    } else {
      setError("An unexpected error occurred");
    }
    setTimeout(() => {
      setError("");
    }, 5000);
  }
};

export default {
  getAll,
  create,
  specificId,
  specificCode,
  postEntry,
};
