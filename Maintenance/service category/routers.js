const jwt = require('jsonwebtoken');

const { addService, updateService, getService, deleteService, searchService } = require('./service');


const router = require('express').Router();



router.post('/add', addService)
router.post('/update', updateService)
router.get('/get', verifyToken, getService)
router.delete('/delete:id', deleteService)
router.get('/get:search', verifyToken, searchService)


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