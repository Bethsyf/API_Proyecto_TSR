import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllUser = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  if (
    Object.keys(datosUsuario).includes('name') &&
    Object.keys(datosUsuario).includes('surname') &&
    Object.keys(datosUsuario).includes('mail') &&
    Object.keys(datosUsuario).includes('state') &&
    Object.keys(datosUsuario).includes('role')
  ) {
    const baseDeDatos = getDB();
  
    await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
  } else {
    return 'error';
  }
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

export { queryAllUser, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario };
