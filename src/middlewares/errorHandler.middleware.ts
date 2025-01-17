import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {

    console.error(`Error Occured on PATH: ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON payload passed. Please check your request body and try again",
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    error: error?.message || "Unknow error occurred",
  });
};
