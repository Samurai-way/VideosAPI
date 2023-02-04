import express from 'express'
import {videosRouter} from "./routers/videos-router";

const app = express()
const port = 3000


app.use(express.json({}))
app.use('/videos', videosRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})