const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // listar todos los productos de la base
});

router.get('/:pid', (req, res) => {
  // traer sólo el producto con el id proporcionado
});

router.post('/', (req, res) => {
  // agregar un nuevo producto con los campos especificados
});

router.put('/:pid', (req, res) => {
  // actualizar el producto con el id proporcionado
});

router.delete('/:pid', (req, res) => {
  // eliminar el producto con el id proporcionado
});

module.exports = router;
