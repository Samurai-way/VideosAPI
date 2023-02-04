import {Request, Response, Router} from "express";

export const videosRouter = Router({})

const videos = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-02-04T09:22:50.102Z",
        publicationDate: "2023-02-04T09:22:50.102Z",
        availableResolutions: [
            "P144"
        ]
    }
]

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {
    const {title, author} = req.body
    const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
    const availableValidation = availableResolutionsArray.some(el => availableResolutionsArray.indexOf(el) == -1)
    const newVideo = {
        id: (new Date().toISOString()) as any,
        title: title as any,
        author: author as any,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: (Date.now()) as any,
        publicationDate: (Date.now()) as any,
        availableResolutions: [req.body.availableResolutions]

    }
    if (!title || title.length > 40 || !author || author.length > 20 || !availableValidation) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "error",
                    field: "error"
                }
            ]
        })
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})