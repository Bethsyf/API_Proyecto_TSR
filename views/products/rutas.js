import Express from 'express';
import {
  queryAllProducts,
  crearProducto,
  editarProducto,
  eliminarProducto,
  consultarProducto,
} from '../../controllers/products/controllers.js';

const rutasProductos = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los vehiculos');
  } else {
    res.json(result);
  }
};

rutasProductos.route('/products').get((req, res) => {
  console.log('alguien hizo get en la ruta /products');
  queryAllProducts(genercCallback(res));
});

rutasProductos.route('/products').post((req, res) => {
  crearProducto(req.body, genercCallback(res));
});

rutasProductos.route('/products/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /products');
  consultarProducto(req.params.id, genercCallback(res));
});

rutasProducto.route('/products/:id').patch((req, res) => {
  editarProducto(req.params.id, req.body, genercCallback(res));
});

rutasVehiculo.route('/products/:id').delete((req, res) => {
  eliminarProducto(req.params.id, genercCallback(res));
});

export default rutasProductos;
