import express from "express";
import { Response, Request, NextFunction } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../../types";
import { newDiaryParser } from "../utils";
import { z } from "zod";
const router = express.Router();

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
})
const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
router.use(errorMiddleware);
export default router;
