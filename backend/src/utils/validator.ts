import {NextFunction, Request, Response} from "express"
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[] ) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) // we run a loop to check all 
        {
            const result = await validation.run(req)
            if(!result.isEmpty())
            {
                break;
            }
        }
        const errors = validationResult(req) // if there were no errors, we will move onto the next middleware
        if (errors.isEmpty())
        {
            return next() // we move on to the next middleware
        }
        return res.status(422).json({ errors: errors.array() }) // else we send this which is an unprocessable entity
    }
}

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is Required!"),
    body("password").trim().isLength({min: 8}).withMessage("Password should contain at least 8 characters!")
];

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required!"),
    ...loginValidator // login validator contains email and password check which are also checked here so we included the validator itself
];


