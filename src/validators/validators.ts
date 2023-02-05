import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);


export const title = body('title').trim().isLength({max: 40, min: 1}).withMessage('title maxLength: 40')
export const author = body('author').trim().isLength({max: 20, min: 1}).withMessage('author maxLength: 20')
export const canBeDownloaded = body('canBeDownloaded').isBoolean()
export const minAgeRestriction = body('minAgeRestriction').isFloat({min: 1, max: 18})
export const createdAt = body('createdAt').isString()
export const publicationDate = body('publicationDate').isString()
const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

export const availableResolutions = body('availableResolutions').custom((value, {req}) => {
    const array = req.body.availableResolutions
    const toggle = array.every((e: any) => availableResolutionsArray.includes(e))
    if (!toggle) throw new Error('availableResolutions')
    return true
})


export const postValidator = [title, author, availableResolutions, inputValidationMiddleware]
export const putValidator = [title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate, inputValidationMiddleware]