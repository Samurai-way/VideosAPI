import {Request, Response, Router} from "express";
import {
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
    title
} from "../validators/validators";
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

export let videos: VideoArrayTypes[] = []

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', title, author, availableResolutions, inputValidationMiddleware, (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const newVideo: VideoArrayTypes = {
        id: +(new Date()),
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: tomorrow,
        availableResolutions: availableResolutions
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
videosRouter.put('/:id', title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate, inputValidationMiddleware, (req: Request, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
    const id = +req.params.id
    const findVideo = videos.find(v => v.id === id)
    if (findVideo) {
        findVideo.id = id
        findVideo.title = title
        findVideo.author = author
        findVideo.availableResolutions = availableResolutions
        findVideo.canBeDownloaded = canBeDownloaded
        findVideo.minAgeRestriction = minAgeRestriction.toString()
        findVideo.publicationDate = publicationDate
    }
    res.sendStatus(204)
})