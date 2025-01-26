const express=require('express');
const {pool}=require('../app.js');
const bcrypt = require('bcrypt');
const authorize=require('../middleware/Auth.js');
const resourceValidation=require('../middleware/Valid.js');
const { check, validationResult } = require('express-validator');


const router=express.Router();

router.post('/api/create', authorize(['Admin']), resourceValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO resources (name, description, created_at) VALUES ($1, $2, NOW()) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router;