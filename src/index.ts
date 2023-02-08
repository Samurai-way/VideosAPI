import express, {Request, Response} from 'express'
import {videosRouter} from "./routers/videos-router";
import {runDb} from "./repositories/db";

const app = express()
const port = 3000

let videos = []

app.use(express.json({}))

app.use('/videos', videosRouter)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.status(204).send('All data is deleted')
})

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
