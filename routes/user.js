const express = require('express');
const {signin, signup} = require('../controllers/auth.controller');
const verifyToken = require('../middleware/authJWT');
const router = express.Router();

router.post('/register', signup, () => {});
router.post('/login', signin, () => {});
router.get('/admin', verifyToken, (req, res, user) => {
    if (!user) return res.status(403).send({message: 'Invalid Key'});
    if (req.user === 'admin') {
        res.status(200).send({message: 'Congratulations admin'});
    } else {
        res.status(403).send({message: 'Unauthorized access'});
    }
});

module.exports = router;
