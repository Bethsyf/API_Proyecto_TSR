import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasProducto from './views/products/rutas.js';
import rutasUsuario from './views/users/rutas.js';
import rutasVenta from './views/sales/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://misiontic-tsr.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-trs',
issuer: 'https://misiontic-tsr.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);
