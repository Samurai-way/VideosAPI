import {Router} from "express";

export const personsRouter = Router({})

const persons = [
    {id: 1, name: 'Dima', age: 10},
    {id: 2, name: 'Artur', age: 22},
    {id: 3, name: 'Oleg', age: 25},
]

personsRouter.get('/persons', (req, res) => {
    if(req.query.name){
        const searchString = req.query.name.toString()
        res.send(persons.filter( p => p.name.indexOf(searchString) > -1))
    }else {
        res.send(persons)
    }
})
personsRouter.get('/persons/:id', (req, res) => {
    const personId = persons.find(p => p.id === +req.params.id)
    if(personId){
        res.send(personId)
    }else {
        res.send(404)
    }
})
personsRouter.post('/persons', (req, res) => {
    const newPerson = {
        id: +(new Date()),
        name: req.body.name,
        age: +(new Date())
    }
    persons.push(newPerson)
    res.status(201).send(newPerson)
})
personsRouter.put('/persons/:id', (req, res) => {
    const person = persons.find( p => p.id === +req.params.id)
    if(person){
        person.name = req.body.name
        res.send(person)
    }else {
        res.send(404)
    }
})
personsRouter.delete('/persons/:id', (req, res) => {
    for (let i = 0; i < persons.length; i++) {
        if(persons[i].id === +req.params.id){
            persons.splice(i, 1)
            res.send(201)
            return
        }
    }
    res.send(404)
})
