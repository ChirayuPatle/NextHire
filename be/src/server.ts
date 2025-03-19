import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import env from './configs/env-config';
import { OK } from './configs/http-status-codes';
import errorHandler from './middlewares/error-handler';
import catchErrors from './utils/catch-errors';

// Routes Imports

// Env variable
const PORT = env.PORT;
const NODE_ENV = env.NODE_ENV;

const app = express();

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(
  cors({
    //TODO: need to add ORIGIN_URL of our frontend
    origin: `*`,
    credentials: true,
  }),
);
app.use(cookieParser());

app.get(
  '/',
  catchErrors(async (req, res) => {
    return res.status(OK).json({
      message: 'Healthy',
    });
  }),
);

/// Error handler middleware

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running : http://localhost:${PORT} in ${NODE_ENV} environment `,
  );
});
