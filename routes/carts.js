const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // crear un nuevo carrito con la siguiente estructura
});

router.get('/:cid', (req, res) => {
  // listar los productos que pertenezcan al carrito con el parámetro cid proporcionado
});

router.post('/:cid/product/:pid', (req, res) => {
  // agregar el producto al carrito seleccionado
});

module.exports = router;
