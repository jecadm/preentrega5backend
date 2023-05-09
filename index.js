const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

const productsFilePath = path.join(__dirname, 'productos.json');
const cartsFilePath = path.join(__dirname, 'carrito.json');

const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

// Rutas para productos
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  const products = readJSONFile(productsFilePath);
  res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
  const products = readJSONFile(productsFilePath);
  const product = products.find((p) => p.id == req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.post('/', (req, res) => {
  const products = readJSONFile(productsFilePath);
  const newProduct = {
    id: uuidv4(),
    ...req.body,
  };
  products.push(newProduct);
  writeJSONFile(productsFilePath, products);
  res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const products = readJSONFile(productsFilePath);
  const index = products.findIndex((p) => p.id == req.params.pid);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...req.body,
      id: req.params.pid, // asegurarse de que el id no se actualice
    };
    writeJSONFile(productsFilePath, products);
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.delete('/:pid', (req, res) => {
  const products = readJSONFile(productsFilePath);
  const filteredProducts = products.filter((p) => p.id != req.params.pid);
  if (filteredProducts.length < products.length) {
    writeJSONFile(productsFilePath, filteredProducts);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.use('/api/products', productsRouter);

// Rutas para carritos
const cartsRouter = express.Router();

cartsRouter.get('/:cid', (req, res) => {
  const carts = readJSONFile(cartsFilePath);
  const cart = carts.find((c) => c.id == req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

cartsRouter.post('/', (req, res) => {
  const carts = readJSONFile(cartsFilePath);
  const newCart = {
    id: uuidv4(),
    products: [],
  };
  carts.push(newCart);
  writeJSONFile(cartsFilePath, carts);
  res.status(201).json(newCart);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const carts = readJSONFile(cartsFilePath);
  const index = carts.findIndex
ChatGPT
((c) => c.id == req.params.cid);
if (index !== -1) {
const products = readJSONFile(productsFilePath);
const product = products.find((p) => p.id == req.params.pid);
if (product) {
carts[index].products.push(product);
writeJSONFile(cartsFilePath, carts);
res.status(201).json(product);
} else {
res.status(404).json({ error: 'Producto no encontrado' });
}
} else {
res.status(404).json({ error: 'Carrito no encontrado' });
}
});

cartsRouter.delete('/:cid/product/:pid', (req, res) => {
const carts = readJSONFile(cartsFilePath);
const index = carts.findIndex((c) => c.id == req.params.cid);
if (index !== -1) {
const products = carts[index].products;
const filteredProducts = products.filter((p) => p.id != req.params.pid);
if (filteredProducts.length < products.length) {
carts[index].products = filteredProducts;
writeJSONFile(cartsFilePath, carts);
res.sendStatus(204);
} else {
res.status(404).json({ error: 'Producto no encontrado' });
}
} else {
res.status(404).json({ error: 'Carrito no encontrado' });
}
});

// eliminar un carrito
cartsRouter.delete('/:cid', (req, res) => {
const carts = readJSONFile(cartsFilePath);
const filteredCarts = carts.filter((c) => c.id != req.params.cid);
if (filteredCarts.length < carts.length) {
writeJSONFile(cartsFilePath, filteredCarts);
res.sendStatus(204);
} else {
res.status(404).json({ error: 'Carrito no encontrado' });
}
});

// Ruta POST / para crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
const carts = JSON.parse(fs.readFileSync(cartsFilePath));
const newCart = {
id: uuidv4(),
products: [],
};
carts.push(newCart);
fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
res.status(201).json(newCart);
});

app.use('/api/carts', cartsRouter);

app.listen(8080, () => console.log('Servidor escuchando en puerto 8080...'));

module.exports = app;