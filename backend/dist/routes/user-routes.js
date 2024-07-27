import { Router } from "express";
import { getAllusers, UserLogin, UserSignup } from "../controllers/user-controller.js";
import { validate, signupValidator, loginValidator } from "../utils/validator.js";
const userRoutes = Router();
userRoutes.get('/', getAllusers); // getAllusers is defined in "USER-CONTROLLER" which will retrieve the users from the database. This is a GET Request because we will be retrieving data
userRoutes.post('/signup', validate(signupValidator), UserSignup);
userRoutes.post('/login', validate(loginValidator), UserLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map