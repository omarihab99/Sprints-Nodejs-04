const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const controller = require('./controllers/products.js');
const PORT = process.env.PORT;

app.use(express.json());
controller(app);
app.listen(PORT, ()=>{
  console.log(`Server: running on ${PORT}`);
});