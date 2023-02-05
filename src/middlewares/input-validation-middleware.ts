import {validationResult} from "express-validator";
import {NextFunction} from "express";
import {Request, Response} from 'express'


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
       res.send(400).json({errors: error.array()})
        return
    }else {
        next()
    }
}