// requires

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const { auth } = require('express-openid-connect');
require('dotenv').config({path: './.env'});


// importing routes 
const customerRoutes = require('./routes/customer');
const { application } = require('express');
const { urlencoded } = require('express');

const app = express();

// settings

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'qwertyuiop',
    baseURL: 'http://localhost:3000',
    clientID: 'rwjxnXKfCQdImwfQ5XBglk5QAPeYG34F',
    issuerBaseURL: 'https://dev-7tf9hrv3.us.auth0.com'
  };

// middlewares 
app.use(auth(config));
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root', 
    password: 'password',
    port: 3306, 
    database: 'plataforma_pagos'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// routes

app.use('/', customerRoutes);

// static files

app.use(express.static(path.join(__dirname, 'public'))); 

// starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
});