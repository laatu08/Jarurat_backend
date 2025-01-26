const express=require('express');
const {pool}=require('../app.js');
const bcrypt = require('bcrypt');

const router=express.Router();

router.post('/api/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports=router;
