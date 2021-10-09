import Express from 'express';

const app = Express();

app.get('/products',(req, res) => {
    console.log('alguien hizo get en la ruta /products');
    res.send('productos no hay');
});

app.listen(5000,() => {
    console.log('escuchando puerto 5000');
});