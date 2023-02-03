import express from 'express'

const app = express()
const port = 3000

const persons = [
    {name: 'Dima', age: 10},
    {name: 'Artur', age: 22},
    {name: 'Oleg', age: 25},
]

app.get('/persons', (req, res) => {
    res.send(persons)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})