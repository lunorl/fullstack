import express from "express";
import { calculateBmi } from "./bmicCalc";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (!weight || !height) {
    res.send(null);
  }
  const bmi: string = calculateBmi(height, weight);
  res.json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!Array.isArray(daily_exercises) || !Number(target)) {
    throw new Error("parameters missing");
}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(Number(target), daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
