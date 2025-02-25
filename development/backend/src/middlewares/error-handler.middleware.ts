import { NextFunction, Request, Response } from "express";
import { AppError, ErrorLogger } from "../utils/errors";

const errorHandler = async (
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof AppError) error.addRequestContext(req);

    const errorLog = ErrorLogger.error(error, {
      functionName:
        (error as AppError).context.functionName || "Unknow Function",
      requestContext: {
        method: req.method,
        url: req.url,
        baseUrl: req.baseUrl,
        path: req.path,
        params: req.params,
        query: req.query,
        body: req.body,
      },
    });

    const response = {
      status: error instanceof AppError ? error.status : 500,
      message: error.message,
      error: process.env.NODE_ENV === "development" ? errorLog : undefined,
    };

    res.status(response.status).json({ message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
