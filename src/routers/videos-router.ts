import {Request, Response, Router} from "express";
import {postValidator, putValidator} from "../validators/validators";
import {videosService} from "../domain/videos-service";

export const videosRouter = Router({})


videosRouter.get('/', async (req: Request, res: Response) => {
    const findVideos = await videosService.getVideos()
    res.status(200).send(findVideos)
})
videosRouter.post('/', postValidator, async (req: Request, res: Response) => {
    const {title, author, availableResolutions} = req.body
    const newVideo = await videosService.createVideo(title, author, availableResolutions)
    if (!newVideo) return 404
    res.send(201)
})
videosRouter.get('/:id', async (req: Request, res: Response) => {
    const requestId = +req.params.id
    const findVideo = await videosService.getVideo(requestId)
    if (!findVideo) res.status(404).send('If video for passed id doesn\'t exist')
    res.status(200).send(findVideo)
})
videosRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id
    const video = await videosService.deleteVideo(id)
    if (!video) res.send(404)
    res.send(204)
})
videosRouter.put('/:id', putValidator, async (req: Request, res: Response) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
    const id = +req.params.id
    const putVideo = await videosService.updateVideo(id, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate)
    if (!putVideo) res.send(404)
    const video = await videosService.getVideo(id)
    res.status(204).send(video)
})