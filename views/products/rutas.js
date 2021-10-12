import Express from 'express';
import {
  queryAllProducts,
  crearProducto,
  editarProducto,
  eliminarProducto,
  consultarProducto,
} from '../../controllers/products/controllers.js';

const rutasProducto = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los productos');
  } else {
    res.json(result);
  }
};

rutasProducto.route('/products').get((req, res) => {
  console.log('alguien hizo get en la ruta /products');
  queryAllProducts(genercCallback(res));
});

rutasProducto.route('/products').post((req, res) => {
  crearProducto(req.body, genercCallback(res));
});

rutasProducto.route('/products/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /products');
  consultarProducto(req.params.id, genercCallback(res));
});

rutasProducto.route('/products/:id').patch((req, res) => {
  editarProducto(req.params.id, req.body, genercCallback(res));
});

rutasProducto.route('/products/:id').delete((req, res) => {
  eliminarProducto(req.params.id, genercCallback(res));
});

export default rutasProducto;
