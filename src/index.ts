import express from 'express'

const app = express()
const port = 3000

const products = [{title: 'tomato'}, {title: 'orange'}]
const addresses = [{id: 1, title: 'Kiev'}, {id: 2, title: 'Odessa'}]

app.get('/', (req, res) => {
    const message = 'Hello!'
    res.send(message)
})

app.get('/products/:productTitle', (req, res) => {
    const product = products.find(e => e.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

// app.get('/addresses/:addressesTitle', (req, res) => {
//     const address = addresses.find(e => e.title === req.params.addressesTitle)
//     if (address) {
//         res.send(address)
//     } else {
//         res.send(404)
//     }
// })

app.get('/addresses/:id', (req, res) => {
    let address = addresses.find(e => e.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})


app.get('/friends', (req, res) => {
    const message = 'Hello my friend!'
    res.send(message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})