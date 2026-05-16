const express = require('express')
const app = express();
const cors = require("cors");
const { config } = require('dotenv')

app.use(express.json())
app.use(cors());

let port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('welcome to my backened')
})
let products = [
    { id: 1, name: 'Shoes', price: 100 },
    { id: 2, name: 'Laptop', price: 200 },
    { id: 3, name: 'Mouse', price: 300 },
    { id: 4, name: 'Keychain', price: 400 },
]
app.get('/products', (req, res) => {
    res.json({ limit: 30, page: 1, products: products })
})

app.post("/products", (req, res) => {
    console.log(req.body.name);
    console.log(req.body.price);

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct);


    res.status(201).json({ message: 'product added successfully!', newProduct })
})

app.put("/product/:id", (req, res) => {
    console.log(req.params.id);
    const id = Number(req.params.id);

    console.log(req.body.name);
    console.log(req.body.price);
    const product = products.find((product) => product.id === id)

    if (!product) {
        return res.status(404).json({ message: "product not found!" })
    }
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price


    res.status(200).json({ message: "product updated successfully!", product })

})

app.delete("/product/:id", (req, res) => {
    console.log(req.params.id);
    const id = Number(req.params.id);

    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).json({ message: "product not found!" })
    }
    products = products.filter((p) => p.id !== id)

    res.status(200).json({ message: "product deleted successfully!" })

})

app.listen(port, () => {
    console.log('server is running in port ' + port);

})