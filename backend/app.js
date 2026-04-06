const bodyParser = require('body-parser');
const express = require('express');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(bodyParser.json())

// Middleware para evitar o CORS Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});