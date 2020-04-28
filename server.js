const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

const routes = require('./routes/api')

const banana = 'mongodb+srv://clejeune:laias123@cluster0-glbkd.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(banana, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose Is Connected!!')
});

// Data parsing so the data is available to the routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())
// HTTP request logger
app.use(morgan('tiny'));
app.use('', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
