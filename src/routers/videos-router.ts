import {Request, Response, Router} from "express";
import {postValidator, putValidator} from "../validators/validators";
import {videosRepository} from "../repositories/videos-repository-db";
import {videosService} from "../domain/videos-service";

export const videosRouter = Router({})


videosRouter.get('/', async (req: Request, res: Response) => {
    const findVideos = await videosService.getVideos()
    res.status(200).send(findVideos)
})
videosRouter.post('/', postValidator, async (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body
    const newVideo = await videosRepository.createVideo(title, author, availableResolutions)
    res.status(201).send(newVideo)
})
videosRouter.get('/:id', async (req: Request, res: Response) => {
    const requestId = +req.params.id
    const findVideo = await videosRepository.getVideo(requestId)
    if (!findVideo) {
        res.status(404).send('If video for passed id doesn\'t exist')
    }
    res.status(200).send(findVideo)


})
videosRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id
    const video = await videosRepository.deleteVideo(id)
    if (video) {
        res.send(204)
    }
    res.send(404)
})
videosRouter.put('/:id', putValidator, async (req: Request, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
    const id = +req.params.id
    const putVideo = await videosRepository.updateVideo(id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate)
    if (putVideo) {
        const video = await videosRepository.getVideo(id)
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})