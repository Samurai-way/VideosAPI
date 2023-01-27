import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const message = 'Hello my friend!'
    res.send(message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})