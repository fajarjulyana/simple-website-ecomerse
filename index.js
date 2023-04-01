const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Setup database connection
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

// Set up view engine
app.set('view engine', 'ejs');

// Set up static files
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
