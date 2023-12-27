const { addTireModel, updateTireModel, getTireModel, deleteTireModel, searchTireModel } = require('./tireModelService');

const jwt = require('jsonwebtoken')

const router = require('express').Router();



router.post('/add', addTireModel);
router.post('/update', updateTireModel);
router.get('/get', verifyToken, getTireModel);
router.delete('/delete:id', deleteTireModel);
router.get('/get:search',verifyToken, searchTireModel);



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


module.exports = router;