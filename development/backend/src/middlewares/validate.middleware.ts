import { NextFunction, Request, Response } from "express";
import { AppError } from "src/utils/errors";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request<unknown>, res: Response, next: NextFunction) => {
    res.locals.func = "validate";

    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      Object.assign(req, validatedData);
      next();
    } catch (error) {
      let message = "Validation failed";
      let status = 500;

      if (error instanceof ZodError) {
        message = error.issues.map((issue) => issue.message).join(", ");
        status = 400;
      }

      const validateError = new AppError(message, status, "LOW", {
        functionName: "validate zod error",
      });

      next(validateError);
    }
  };
