import { NextFunction, Request, Response, Router } from "express";
import { AppError } from "../utils/errors";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ meeeage: " ok" });
  } catch (error) {
    next(error);
  }
});

router.get("/error", (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError("Test error function", 400, "LOW", {
      functionName: "Health Test Error ",
      additionalData: {
        userId: "Test Health User ID",
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
