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