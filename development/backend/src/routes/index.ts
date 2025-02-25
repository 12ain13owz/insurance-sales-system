import { NextFunction, Request, Router } from "express";
import health from "./health.routes";
import { AppRes } from "../types/express";
import auth from "./v1/auth.routes";

const router = Router();

router.get("/", (req: Request, res: AppRes, next: NextFunction) => {
  res.json({ message: "Hello World!" });
});
router.use("/health", health);
router.use("/api/v1/auth", auth);

export default router;
