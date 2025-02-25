import { Request } from "express";
import { ErrorContext, ErrorSeverity } from "../types/error.type";

export class AppError extends Error {
  constructor(
    message: string,
    public status: number,
    public severity: ErrorSeverity,
    public context: ErrorContext
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  addRequestContext(req: Request) {
    this.context.requestContext = {
      method: req.method,
      url: req.originalUrl,
      baseUrl: req.baseUrl,
      path: req.path,
      body: req.body,
      params: req.params,
      query: req.query,
    };

    return this;
  }
}

export class ErrorLogger {
  private static formatErrorLog(
    error: AppError | Error,
    additionalData?: Record<string, any>
  ) {
    const baseLog = {
      timestamp: new Date().toISOString(),
      name: error.name,
      message: error.message,
    };

    if (error instanceof AppError)
      return {
        ...baseLog,
        status: error.status,
        severity: error.severity,
        ...error.context,
        ...additionalData,
      };

    return {
      ...baseLog,
      status: 500,
      severity: "HIGH",
      ...additionalData,
    };
  }

  static error(
    error: AppError | Error,
    additionalContext?: Partial<ErrorContext>
  ) {
    const errorLog = this.formatErrorLog(error, additionalContext);
    console.error(JSON.stringify(errorLog, null, 2));
    return errorLog;
  }

  static notFound(functionName: string, additionalData?: Record<string, any>) {
    return new AppError("Not Found", 404, "LOW", {
      functionName,
      additionalData,
    });
  }

  static badRequest(
    functionName: string,
    additionalData?: Record<string, any>
  ) {
    return new AppError("Bad Request", 400, "MEDIUM", {
      functionName,
      additionalData,
    });
  }

  static unauthorized(
    functionName: string,
    additionalData?: Record<string, any>
  ) {
    return new AppError("Unauthorized", 401, "HIGH", {
      functionName,
      additionalData,
    });
  }

  static serverError(
    functionName: string,
    additionalData?: Record<string, any>
  ) {
    return new AppError("Internal Server Error", 500, "CRITICAL", {
      functionName,
      additionalData,
    });
  }
}
