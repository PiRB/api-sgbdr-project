const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'Cookie',
    'Set-Cooke'
  ],
  credentials: true,
  methods: ['GET']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', routes);
const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`http://localhost:${port}/api`);
})