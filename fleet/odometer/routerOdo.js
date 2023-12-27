const { addOdometer, updateOdometer, getOdometer, deleteOdometer, searchOdometer } = require('./serviceOdo');

const jwt = require('jsonwebtoken');


const router = require('express').Router();



router.post('/add', addOdometer)
router.post('/update', updateOdometer)
router.get('/get', verifyToken, getOdometer)
router.delete('/delete:id', deleteOdometer)
router.get('/get:search', verifyToken, searchOdometer)


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