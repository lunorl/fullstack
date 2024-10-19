import axios from "axios";
import { Entry, NewEntry } from "../../types";

export const getEntries = async () => {
  return await axios
    .get<Entry[]>("http://localhost:3000/api/diaries")
    .then((response) => response.data);
};
export const sendEntry = async (
  entry: NewEntry,
  setError: (error: string) => void
) => {
  try {
    return await axios
      .post<Entry>("http://localhost:3000/api/diaries", entry)
      .then((response) => response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.error);
      console.log(
        "m",
        error.response?.data.error
          .map((n: { message: string }) => n.message)
          .join(",")
      );
      setError("Error: " + error.response?.data.error
        .map((n: { message: string }) => n.message)
        .join(","));
    }
    setTimeout(() => {
      setError("");
    }, 5000);
  }
};
