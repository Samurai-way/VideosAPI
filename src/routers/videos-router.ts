import {Request, Response, Router} from "express";

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

const videos: VideoArrayTypes[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: [
            "P144"
        ]
    }
]

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {
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
    if (!title || title.length > 40) {
        const exeption = {
            message: "error",
            field: "title"
        }
        arr.push(exeption)
    }
    if (!author || author.length > 20) {
        const exeption = {
            message: "error",
            field: "author"
        }
        arr.push(exeption)
    }
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
    const requestId = req.params.id
    const video = videos.find((v) => v.id === +requestId)
    console.log(video)
    if (requestId) {
        res.status(200).send(video)
    } else {
        res.status(404).send('If video for passed id doesn\'t exist')
    }

})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const requestId = req.body.id
    if (requestId) {
        const filteredVideo = videos.filter(v => v.id !== requestId)
        res.status(204).send(filteredVideo)
    } else {
        res.status(404).send('Not Found')
    }
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    const {id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
    const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    const availableValidation = availableResolutionsArray.some(el => availableResolutionsArray.indexOf(el) == -1)
    if (!id || title.length > 40 || author.length > 20 || !availableValidation || !minAgeRestriction || minAgeRestriction.length > 18 || minAgeRestriction.length < 1) {
        const videoMap = videos.map(v => ({...v, id: id, title: title, availableValidation: availableResolutions}))
        res.status(204).send(videoMap)
    } else {
        res.send(404)
    }
})