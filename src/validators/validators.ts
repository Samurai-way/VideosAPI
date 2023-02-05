import {body} from "express-validator";

export const title = body('title').trim().isLength({max: 40}).withMessage('title maxLength: 40')
export const author = body('author').trim().isLength({max: 20}).withMessage('author maxLength: 20')
export const minAgeRestriction = body('minAgeRestriction').trim().isLength({min: 1,max: 18})



export const availableValidation = body('availableValidation').trim().isLength({max: 20})

// 22.48