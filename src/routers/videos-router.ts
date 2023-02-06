import {Request, Response, Router} from "express";
import {postValidator, putValidator} from "../validators/validators";
import {videosRepository} from "../repositories/videos-repository";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    const findVideos = videosRepository.findVideos()
    res.status(200).send(findVideos)
})
videosRouter.post('/', postValidator, (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body
    const newVideo = videosRepository.createVideo(title, author, availableResolutions)
    res.status(201).send(newVideo)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const requestId = +req.params.id
    const findVideo = videosRepository.findVideo(requestId)
    if (!findVideo) {
        res.status(404).send('If video for passed id doesn\'t exist')
    }
    res.status(200).send(findVideo)


})
// videosRouter.delete('/:id', (req: Request, res: Response) => {
//     const id = +req.params.id
//     const video = videosRepository.deleteVideo(id)
//     if (!video) {
//         res.send(404)
//     }
//     res.send(204)
// })
videosRouter.put('/:id', putValidator, (req: Request, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
    const id = +req.params.id
    const putVideo = videosRepository.putVideo(id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate)
    if (!putVideo) {
        res.send(404)
    }
    res.send(204)
})