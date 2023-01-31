import express from 'express'

const app = express()
const port = 3000

const videos = [
    {id: 0, title: 'YouTube', author: 'Oleg'},
    {id: 1, title: 'Cinema', author: 'Artur'},
    {id: 2, title: 'Change', author: 'Petya'},
]

app.get('/videos', (req, res) => {
    if(videos){
        res.send(videos)
    }else {
        res.send(404)
    }
})

app.post('/videos', (req, res) => {
    debugger
    const video = req.body
    videos.push(video)
    if(videos){
        res.send(videos)
    }else {
        res.send(404)
    }
})

const a = 15


console.log(1)
setTimeout(()=>{
    console.log(2)
},0)
Promise.resolve().then(()=>console.log(3))
console.log(4)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})