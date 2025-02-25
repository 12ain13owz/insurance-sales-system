export type RequestContext = {
  method: string;
  url: string;
  baseUrl: string;
  path: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: Record<string, any>;
};

export type ErrorContext = {
  functionName: string;
  requestContext?: RequestContext;
  additionalData?: Record<string, any>;
};

export type ErrorSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
