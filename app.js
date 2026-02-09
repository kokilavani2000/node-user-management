const express = require('express');
const path = require('path');
const connectDb = require('./config/db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//load .env
connectDb();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('signin');
});

app.get('/register', (req, res) => {
    res.render('signup');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
