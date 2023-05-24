import Express from 'express';
import AuthRouter from '@routes/api/auth';

const ApiRouter = Express.Router();
ApiRouter.use('/auth', AuthRouter);
export { ApiRouter };
