import { Router } from "express";
import health from "./health.routes";
import auth from "./v1/auth.routes";

const router = Router();

router.use("/health", health);
router.use("/api/v1/auth", auth);

export default router;
