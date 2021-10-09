import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/products', (req, res) => {
    console.log('alguien hizo get en la ruta /products');
    const productos = [
        {id: '00001', descripcion: 'Jabón de Caléndula', valorUnitario: '21.900,00', estado: 'Disponible'},
        {id: '00002', descripcion: 'Jabón de Verbena', valorUnitario: '21.900,00', estado: 'Disponible'},
        {id: '00003', descripcion: 'Jabón de Avena', valorUnitario: '21.900,00', estado: 'Disponible'},
        {id: '00004', descripcion: 'Jabón de Menta', valorUnitario: '21.900,00', estado: 'Disponible'},
    ]
    res.send(productos);
});

app.post('/products/new', (req, res) => {
    const datosProducto = req.body;
    console.log('llaves: ', Object.keys(datosProducto));
    try {
        if (
            Object.keys(datosProducto).includes('id') && 
            Object.keys(datosProducto).includes('descripcion') && 
            Object.keys(datosProducto).includes('valorUnitario') && 
            Object.keys(datosProducto).includes('Estado')
        ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }

});

app.listen(5000, () => {
    console.log('escuchando puerto 5000');
});