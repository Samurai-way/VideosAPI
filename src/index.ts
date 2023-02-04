import express from 'express'
import {arrRouter, personsRouter} from "./routers/persons-router";
import {videosRouter} from "./routers/videos-router";

const app = express()
const port = 3000


// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json({}))
app.use('/persons', personsRouter)
app.use('/arr', arrRouter)
app.use('/videos', videosRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})