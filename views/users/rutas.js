import Express from 'express';
import {
  queryAllUser,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarUsuario,
} from '../../controllers/usuarios/controller.js';

const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los Usuarios');
  } else {
    res.json(result);
  }
};

rutasVehiculo.route('/configuration').get((req, res) => {
  console.log('alguien hizo get en la ruta /configuration');
  queryAllUser(genercCallback(res));
});

rutasUsuario.route('/configuration').post((req, res) => {
  crearUsuario(req.body, genercCallback(res));
});

rutasUsuario.route('/configuration/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /configuration');
  consultarUsuario(req.params.id, genercCallback(res));
});

rutasUsuario.route('/configuration/:id').patch((req, res) => {
  editarUsuario(req.params.id, req.body, genercCallback(res));
});

rutasUsuario.route('/configuration/:id').delete((req, res) => {
  eliminarUsuario(req.params.id, genercCallback(res));
});

export default rutasUsuario;
