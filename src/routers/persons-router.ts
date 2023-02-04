import {Router, Request, Response} from "express";

export const personsRouter = Router({})
export const arrRouter = Router({})

const arr = [{name: 'arr'}]
const persons = [
    {id: 1, name: 'Dima', age: 10},
    {id: 2, name: 'Artur', age: 22},
    {id: 3, name: 'Oleg', age: 25},
]


arrRouter.get('/arr', (req: Request, res: Response) => {
    res.send(arr)
})
personsRouter.get('/', (req: Request, res: Response) => {
    // if(req.query.name){
    //     const searchString = req.query.name.toString()
    //     res.send(persons.filter( p => p.name.indexOf(searchString) > -1))
    // }else {
    //     res.send(persons)
    // }
    res.send(persons)
})
// personsRouter.get('/persons/:id', (req: Request, res: Response) => {
//     const personId = persons.find(p => p.id === +req.params.id)
//     if (personId) {
//         res.send(personId)
//     } else {
//         res.send(404)
//     }
// })
// personsRouter.post('/persons', (req: Request, res: Response) => {
//     const newPerson = {
//         id: +(new Date()),
//         name: req.body.name,
//         age: +(new Date())
//     }
//     persons.push(newPerson)
//     res.status(201).send(newPerson)
// })
// personsRouter.put('/persons/:id', (req: Request, res: Response) => {
//     const person = persons.find(p => p.id === +req.params.id)
//     if (person) {
//         person.name = req.body.name
//         res.send(person)
//     } else {
//         res.send(404)
//     }
// })
// personsRouter.delete('/persons/:id', (req: Request, res: Response) => {
//     for (let i = 0; i < persons.length; i++) {
//         if (persons[i].id === +req.params.id) {
//             persons.splice(i, 1)
//             res.send(201)
//             return
//         }
//     }
//     res.send(404)
// })
