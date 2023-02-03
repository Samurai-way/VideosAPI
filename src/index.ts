import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

const persons = [
    {id: 1, name: 'Dima', age: 10},
    {id: 2, name: 'Artur', age: 22},
    {id: 3, name: 'Oleg', age: 25},
]

// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json({}))

app.get('/persons', (req, res) => {
    if(req.query.name){
        const searchString = req.query.name.toString()
        res.send(persons.filter( p => p.name.indexOf(searchString) > -1))
    }else {
        res.send(persons)
    }
})

app.post('/persons', (req, res) => {
    const newPerson = {
        id: +(new Date()),
        name: req.body.name,
        age: +(new Date())
    }
    persons.push(newPerson)
    res.status(201).send(newPerson)
})


app.delete('/persons/:id', (req, res) => {
    for (let i = 0; i < persons.length; i++) {
        if(persons[i].id === +req.params.id){
            persons.splice(i, 1)
            res.send(201)
            return
        }
    }
    res.send(404)
})


// app.get('/persons/:personName', (req, res) => {
//     const person = persons.find(p => p.name === req.params.personName)
//     if(person){
//         res.send(person)
//     }else {
//         res.send(404)
//     }
// })

app.get('/persons/:id', (req, res) => {
    const personId = persons.find(p => p.id === +req.params.id)
    if(personId){
        res.send(personId)
    }else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})