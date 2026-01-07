const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(flash());


mongoose.connect(process.env.MONGO_URL);

app.use('/', require('./routes/frontend'));

const adminLayoutMiddleware = (req, res, next) => {
    res.locals.layout = 'admin/layout'; 
    next();
};

// Apply it to all routes starting with /admin
app.use('/admin', adminLayoutMiddleware, require('./routes/admin'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});

