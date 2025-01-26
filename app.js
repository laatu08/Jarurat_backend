// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { Pool } = require('pg');
const dotenv=require('dotenv');

dotenv.config();


const app = express();

// Middleware
app.use(bodyParser.json());

// PostgreSQL Connection

const pool = new Pool({
    connectionString: process.env.DB_URL,
});
pool.connect()
    .then(() => { console.log('Connected to Database'); })
    .catch(err => { console.log(`Connection Error: ${err.stack}`); });


app.get('/',(req,res)=>{
    res.send("HelloWOrld");
}
// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports={pool};

const registerRoute=require('./routes/register.js');
const loginRoute=require('./routes/login.js');
const createRoute=require('./routes/create.js');
const getAllRoute=require('./routes/getAll.js');
const getByIdRoute=require('./routes/getById.js');
const updateRoute=require('./routes/update.js');
const deleteRoute=require('./routes/delete.js');

app.use('/',registerRoute);

app.use('/',loginRoute);

app.use('/',createRoute);

app.use('/',getAllRoute);

app.use('/',getByIdRoute);

app.use('/',updateRoute)

app.use('/',deleteRoute);
