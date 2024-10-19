import express from "express";
const app = express();
import cors from "cors";
import diagnosisRouter from "./routes/diagnosis";
import patientRouter from "./routes/patient";
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("im getting pinged");
  res.send("pong");
});
app.use("/api/patients", patientRouter);
app.use("/api/diagnosis", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
