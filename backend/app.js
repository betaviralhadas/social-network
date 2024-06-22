const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('hhhhhhhhhh')
});

module.exports = app;