const express=require('express');
const {pool}=require('../app.js');
const bcrypt = require('bcrypt');
const authorize=require('../middleware/Auth.js');
const resourceValidation=require('../middleware/Valid.js');
const { check, validationResult } = require('express-validator');


const router=express.Router();

router.delete('/api/delete/:id', authorize(['Admin']), async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM resources WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Resource not found' });
        res.json({ message: 'Resource deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router;