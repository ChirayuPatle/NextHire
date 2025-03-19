import type { NextFunction, Request, Response } from 'express';

type AsynController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

// TODO: need to add logic for async and function
// type AsyncOrSync<T> = (...args: any[]) => Promise<T> | ((...args: any[]) => T);

const catchErrors =
  (controllers: AsynController): AsynController =>
  async (req, res, next) => {
    try {
      await controllers(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;
