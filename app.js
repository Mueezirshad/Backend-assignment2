const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require('dotenv')


app.use(express.json());
app.use(cors());

let port = process.env.PORT || 3000;

let products = [
  {
    id: 1,
    title: "Essence Mascara",
    price: 100,
    description: "Comfortable running shoes",
    category: "fashion",
    rating: 4.5,
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
  },
  {
    id: 2,
    title: "Laptop",
    price: 200,
    description: "High performance laptop",
    category: "electronics",
    rating: 4.8,
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
  },
  {
    id: 3,
    title: "Mouse",
    price: 300,
    description: "Wireless mouse",
    category: "electronics",
    rating: 4.2,
    thumbnail:  "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
  },
  {
    id: 4,
    title: "Keychain",
    price: 400,
    description: "Stylish keychain",
    category: "accessories",
    rating: 4.0,
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
  }
];

app.get("/", (req, res) => {
  res.send("welcome to my backend");
});

app.get("/products", (req, res) => {
  res.json({
    limit: 30,
    page: 1,
    products: products
  });
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.json(product);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description || "",
    category: req.body.category || "general",
    rating: req.body.rating || 4,
    thumbnail: req.body.thumbnail || "https://i.imgur.com/1.jpg"
  };

  products.push(newProduct);

  res.status(201).json({
    message: "product added successfully!",
    product: newProduct
  });
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "product not found!" });
  }

  product.title = req.body.title || product.title;
  product.price = req.body.price || product.price;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.rating = req.body.rating || product.rating;
  product.thumbnail = req.body.thumbnail || product.thumbnail;

  res.json({
    message: "product updated successfully!",
    product
  });
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "product not found!" });
  }

  products = products.filter((p) => p.id !== id);

  res.json({ message: "product deleted successfully!" });
});

app.listen(port, () => {
  console.log("server is running in port " + port);
});