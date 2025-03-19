import type AppErrorCode from '../configs/app-error-codes';
import type { HttpStatusCodeType } from '../configs/http-status-codes';

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCodeType,
    public message: string,
    public errorCode?: AppErrorCode,
  ) {
    super(message);
  }
}

// const app = new AppError(
// 	{
// 		OK,
// 	},
// 	"MSG",
// 	"INVALIDACCESSTOKEN"
// );

export default AppError;
