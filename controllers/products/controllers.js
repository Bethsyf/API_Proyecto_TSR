import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllProducts = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('producto').find({}).limit(50).toArray(callback);
};

const crearProducto = async (datosProducto, res) => {
   try {
     if (
    Object.keys(datosProducto).includes('description') &&
    Object.keys(datosProducto).includes('unitValue') &&
    Object.keys(datosProducto).includes('state')
  ) {
    const baseDeDatos = getDB();
   
    await baseDeDatos.collection('producto').insertOne(datosProducto);
    return res.status(200).json({msg:"Producto creado exitosamente"})
  } return res.status(401).json({msg:"El Producto le falta propiedad"})
  } catch(err) {
    console.log(err)
    return res.json({msg:"Ocurrio un error"});
  }
};

const consultarProducto = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('producto').findOne({ _id: new ObjectId(id) }, callback);
};

const editarProducto = async (id, edicion, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('producto')
    .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarProducto = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
};

export { queryAllProducts, crearProducto, consultarProducto, editarProducto, eliminarProducto };
