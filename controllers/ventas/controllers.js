import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllSale = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').find({}).limit(50).toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  try {
    if (
    Object.keys(datosVenta).includes('client') &&
    Object.keys(datosVenta).includes('identification') &&
    Object.keys(datosVenta).includes('product') &&
    Object.keys(datosVenta).includes('quantity') &&
    Object.keys(datosVenta).includes('unitValue') &&
    Object.keys(datosVenta).includes('totalValue') &&
    Object.keys(datosVenta).includes('seller') &&
    Object.keys(datosVenta).includes('saleStatus')
  ) {
    const baseDeDatos = getDB();
  
    await baseDeDatos.collection('venta').insertOne(datosVenta, callback);
    return res.status(200).json({msg:"Producto creado exitosamente"})
  } return res.status(401).json({msg:"El Producto le falta propiedad"})
  } catch(err) {
    console.log(err)
    return res.json({msg:"Ocurrio un error"});
  }
};

const consultarVenta = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVenta = async (id, edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('venta')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').deleteOne(filtroVenta, callback);
};

export { queryAllSale, crearVenta, consultarVenta, editarVenta, eliminarVenta };
