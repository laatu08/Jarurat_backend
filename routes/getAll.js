const express=require('express');
const {pool}=require('../app.js');
const bcrypt = require('bcrypt');
const authorize=require('../middleware/Auth.js');
const resourceValidation=require('../middleware/Valid.js');
const { check, validationResult } = require('express-validator');


const router=express.Router();

router.get('/api/all', authorize(['Admin', 'User']), async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM resources');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports=router;