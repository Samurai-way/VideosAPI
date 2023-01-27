const express = require('express')
const app = express()
const port = 3000

app.get('/', (req: any, res: any) => {
    const message = 'Hello my!'
    res.send(message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})