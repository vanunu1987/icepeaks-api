const express = require('express')
const mongoose = require('./db/mongoos')
const models = require('./models/campaign')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const config = require('./config/dev')
const cors = require('cors')
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth } = require('express-oauth2-jwt-bearer');

// const jwtCheck = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://dev-3ibaojjd.us.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'https://localhost:3000',
//   issuer: 'https://dev-3ibaojjd.us.auth0.com/',
//   algorithms: ['RS256']
// });
// const checkJwt = auth({
//     audience: 'https://gw.icepeaks.link',
//     issuerBaseURL: `https://dev-3ibaojjd.us.auth0.com/`,
//   });

const app = express();
app.use(cors({
    origin: ['http://localhost:3000','https://www.icepeaks.link/'],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(jwtCheck);
app.use('/', routes);

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);


module.exports = app;