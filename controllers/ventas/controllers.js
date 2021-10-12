import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllSale = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').find({}).limit(50).toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
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
  } else {
    return 'error';
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
