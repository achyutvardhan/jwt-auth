const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors());
app.use(express.json())

app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({status: 'ok'})
  });
  app.get('*', (req, res) => {
    res.send('page does not exist ');
  });
  app.listen(8080, () => {
    console.log('welcome to port 8080');
  });