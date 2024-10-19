import express from "express";
import { getDiagnoses, specificDiagnoses } from "../services/diagnosisService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getDiagnoses());
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(specificDiagnoses(id));
});

export default router;
