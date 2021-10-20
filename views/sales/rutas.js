import Express from 'express';
import {
  queryAllSale,
  crearVenta,
  editarVenta,
  eliminarVenta,
  consultarVenta,
} from '../../controllers/ventas/controllers.js';

const rutasVenta = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los Ventas');
  } else {
    res.json(result);
  }
};

rutasVenta.route('/sales').get((req, res) => {
  console.log('alguien hizo get en la ruta /sales');
  queryAllSale(genercCallback(res));
});

rutasVenta.route('/newSales').post((req, res) => {
  crearVenta(req.body, genercCallback(res));
});

rutasVenta.route('/sales/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /sales');
  consultarVenta(req.params.id, genercCallback(res));
});

rutasVenta.route('/sales/:id').patch((req, res) => {
  editarVenta(req.params.id, req.body, genercCallback(res));
});

rutasVenta.route('/sales/:id').delete((req, res) => {
  eliminarVenta(req.params.id, genercCallback(res));
});

export default rutasVenta;
