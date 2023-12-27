const { addVendor, updateVendor, getVendor, deleteVendor, searchVendor } = require('./ServiceV');

const jwt = require('jsonwebtoken')

const router = require('express').Router();



router.post('/add', addVendor)
router.post('/update', updateVendor)
router.get('/get',verifyToken, getVendor)
router.get('/get:search',verifyToken, searchVendor)
router.delete('/delete/:id', deleteVendor)



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