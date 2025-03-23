import assert from 'assert';
import AppError from './app-error';
import type { HttpStatusCodeType } from '../configs/http-status-code';
import type AppErrorCode from '../configs/app-error-codes';

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCodeType,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy
 */

const appAssert: AppAssert = (
  condition: any,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
