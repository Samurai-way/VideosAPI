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
    const title = req.body.title
    const author = req.body.author
    const newVideo = {
        id: (new Date().toISOString()),
        title: title,
        author: author,
        availableResolutions: [
            "P144"
        ]
    }
})