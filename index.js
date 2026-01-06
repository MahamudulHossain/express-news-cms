const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(flash());


mongoose.connect(process.env.MONGO_URL);

app.get('/', (req, res) => {
 res.render('search');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});

