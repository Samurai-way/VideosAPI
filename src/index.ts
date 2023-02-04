import express from 'express'
import {personsRouter} from "./routers/persons-router";

const app = express()
const port = 3000


// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json({}))
app.use('/persons', personsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})