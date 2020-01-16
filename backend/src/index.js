const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb+srv://admin:doraci123@cluster0-namic.mongodb.net/tindev?retryWrites=true&w=majority', {
  useNewUrlParser: true,  
  useUnifiedTopology: true,
});

app.listen(3333); //localhost:3333