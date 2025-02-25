import { Router } from "express";
import { validate } from "src/middlewares/validate.middleware";
import { authSchema } from "src/schemas/auth.schema";
import * as authController from "src/controllers/auth.controller";

const router = Router();

router.post("/login", [validate(authSchema.login)], authController.login);

export default router;
