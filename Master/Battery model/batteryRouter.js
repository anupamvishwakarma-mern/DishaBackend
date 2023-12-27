const { addBattery, updateBattery, getBattery, deleteBattery, searchBattery } = require('./batteryService');

const jwt = require('jsonwebtoken')


const router = require('express').Router();



router.post('/add', addBattery)
router.post('/update', updateBattery)
router.get('/get', verifyToken, getBattery)
router.delete('/delete:id', deleteBattery)
router.get('/get:search', verifyToken, searchBattery)


function verifyToken(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Token is not valid' });
        }

        req.user = userInfo;
        next();
    });
}


module.exports = router