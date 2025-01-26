const express=require('express');
const {pool}=require('../app.js');
const bcrypt = require('bcrypt');
const authorize=require('../middleware/Auth.js');
const resourceValidation=require('../middleware/Valid.js');
const { check, validationResult } = require('express-validator');


const router=express.Router();

router.put('/api/update/:id', authorize(['Admin']), resourceValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE resources SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
            [name, description, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Resource not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router;