const express=require('express');
const {pool}=require('../app.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router=express.Router();

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role },    'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports=router;