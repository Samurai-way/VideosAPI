import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000



// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json({}))






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})