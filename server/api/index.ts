import express from "express";
import postRouter from './post';
import userRouter from './user';

const apiRouter = express.Router();

apiRouter.use(postRouter);
apiRouter.use(userRouter);

export default apiRouter;