const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

module.exports = app;
