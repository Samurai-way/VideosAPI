import {Request, Response, Router} from "express";

export const videosRouter = Router({})

export type RootObject = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction?: any;
    createdAt: Date;
    publicationDate: Date;
    availableResolutions: string[];
}

const videos: RootObject[] = [
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
    console.log(availableResolutions)
    console.log(availableValidation)
    const newVideo: RootObject = {
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
    const requestId = req.body.id
    const findVideoById = videos.find(v => v.id === requestId)
    if (!requestId) {
        res.status(404).send('If video for passed id doesn\'t exist')
    } else {
        res.status(200).send(findVideoById)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const requestId = req.body.id
    if (requestId) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === requestId) {
                videos.splice(i, 1)
                res.send(204)
                return
            }
        }
    } else {
        res.send(404)
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