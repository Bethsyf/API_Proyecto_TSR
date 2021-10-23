import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, res) => {
  try {
    if (
    Object.keys(datosUsuario).includes('name') &&
    Object.keys(datosUsuario).includes('surname') &&
    Object.keys(datosUsuario).includes('email') &&
    Object.keys(datosUsuario).includes('state') &&
    Object.keys(datosUsuario).includes('role')
  ) {
    const baseDeDatos = getDB();
  
    await baseDeDatos.collection('usuario').insertOne(datosUsuario);
    return res.status(200).json({msg:"Usuario creado exitosamente"})
  } return res.status(401).json({msg:"El Usuario le falta propiedad"})
  } catch(err) {
    console.log(err)
    return res.json({msg:"Ocurrio un error"});
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

export { queryAllUsers, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario };
