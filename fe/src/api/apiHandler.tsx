// import { Request, Response, NextFunction } from "express";

// const asyncHandler = (
//   func: (req: Request, res: Response, next: NextFunction) => Promise<void>
// ) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await func(req, res, next);
//     } catch (error: any) {
//       res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message || "Internal Server Error",
//       });
//     }
//   };
// };

// export { asyncHandler };
