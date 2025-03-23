import type { ErrorRequestHandler, Response } from 'express';
import { z } from 'zod';
import { BAD_REQUEST, HttpStatusCode } from '../configs/http-status-codes';
import AppError from '../utils/app-error';

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const handleZodErrors = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join(','),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console.log(`PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    handleZodErrors(res, error);
    return;
  }
  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
  });
};

export default errorHandler;
