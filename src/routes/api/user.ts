import Express from 'express';
import { UserController } from '@app/Http/Controllers/UserController';
import { handler } from '@core/http/controller-handler';
import { UserRequest } from '@app/Http/Request/UserRequest';

const userController = container.resolve<UserController>(UserController);
const UserRouter = Express.Router();

/**
 * Set groups
 * Set Request Validator Middleware
 * Set middleware
 */
UserRouter.use(
    '/users',
    (req, res, next) => {
        new UserRequest(req, res, next).handle();
    },
    UserRouter,
); /* users prefix */

/* Place to define routes */
UserRouter.post('/register', handler(userController, 'register'));
UserRouter.post('/login', handler(userController, 'login'));

export default UserRouter;
