const { addFuel, getFuel, updateFuel, deleteFuel,searchFuel } = require('./FuelServer');

const jwt = require('jsonwebtoken')


const router = require('express').Router();


router.post('/add', addFuel)
router.get('/get', verifyToken, getFuel);
router.get('/get:search', verifyToken, searchFuel);
router.post('/update', updateFuel)
router.delete('/delete/:id', deleteFuel)



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