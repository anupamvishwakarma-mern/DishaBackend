const jwt = require('jsonwebtoken')
const express = require("express");
const { addDriver, updateDriver, driverDelete, getCompany, getBranch, getTeam, getCity, getDepartment, getDriver, searchDriver } = require("./driverService");

const router = express.Router();



router.get('/get', verifyToken, getDriver);
router.get('/get:search', verifyToken, searchDriver);
router.post('/add', addDriver);
router.post('/update', updateDriver);
router.delete('/delete/:id', driverDelete);

router.get('/company', getCompany)
router.get('/branch/:company', getBranch)
router.get('/team', getTeam)
router.get('/city', getCity)
router.get('/department', getDepartment)



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