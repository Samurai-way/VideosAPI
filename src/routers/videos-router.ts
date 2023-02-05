import {Request, Response, Router} from "express";
import {author, minAgeRestriction, title} from "../validators/validators";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const videosRouter = Router({})

export type VideoArrayTypes = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: any;
    createdAt: Date;
    publicationDate: Date;
    availableResolutions: string[];
}

let videos: VideoArrayTypes[] = []

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', title, author, inputValidationMiddleware, (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body
    const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    const availableValidation = availableResolutions.every((el: any) => availableResolutionsArray.includes(el))
    const newVideo: VideoArrayTypes = {
        id: +(new Date()),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: availableResolutions

    }
    const arr = []
    if (!availableValidation) {
        const exeption = {
            message: "error",
            field: "availableResolutions"
        }
        arr.push(exeption)
    }
    if (arr.length > 0) {
        res.status(400).send({
            errorsMessages: arr
        })
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const requestId = +req.params.id
    const video = videos.find((v) => v.id === requestId)
    console.log(video)
    if (video) {
        res.status(200).send(video)
    } else {
        res.status(404).send('If video for passed id doesn\'t exist')
    }

})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.filter(b => b.id !== id)
    if (video.length < videos.length) {
        videos = video
        res.send(204)
    } else {
        res.send(404)
    }
})
videosRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.status(204).send('All data is deleted')
})
videosRouter.put('/:id',title,author, inputValidationMiddleware,minAgeRestriction,(req: Request, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
    const id = +req.params.id
    const findVideo = videos.find(v => v.id === id)
    console.log(id)
    const arr = []
    if (findVideo) {
        findVideo.title = title
        findVideo.author = author
        findVideo.availableResolutions = availableResolutions
        findVideo.canBeDownloaded = false
        findVideo.minAgeRestriction = minAgeRestriction
        findVideo.publicationDate = publicationDate
    }
    res.sendStatus(201)
    if (!findVideo) {
        const exeption = {
            message: "error",
            field: "id"
        }
        arr.push(exeption)
    }
    if (!title) {
        const exeption = {
            message: "error",
            field: "title"
        }
        arr.push(exeption)
    }
    if (!author) {
        const exeption = {
            message: "error",
            field: "author"
        }
        arr.push(exeption)
    }
    if (!availableResolutions) {
        const exeption = {
            message: "error",
            field: "availableResolutions"
        }
        arr.push(exeption)
    }
    if (canBeDownloaded) {
        const exeption = {
            message: "error",
            field: "canBeDownloaded"
        }
        arr.push(exeption)
    }
    if (arr.length) {
        res.status(400).send({
            errorsMessages: arr
        })
    }
})