const jwt = require('jsonwebtoken')

const { addNew, getVehicleData, updateVehicle, deleteVehicleData, getVehicleType,
    getBodyType, getVehicleModel, getOwnership, addModel, updateModel, deleteModel,
    searchVehicleData, searchVehicleModel } = require('./vehicle service');

const router = require('express').Router();



router.post('/addnew', addNew);
router.get('/get', verifyToken, getVehicleData);
router.get('/get:search', verifyToken, searchVehicleData);
router.post('/update', updateVehicle);
router.delete('/delete/:id',verifyToken, deleteVehicleData);

router.get('/vehicletype', getVehicleType)
router.get('/bodytype', getBodyType)
router.get('/vehiclemodel',verifyToken, getVehicleModel)
router.get('/vehiclemodel:search',verifyToken, searchVehicleModel)
router.get('/ownership', getOwnership)

// router.post('/add/vehicletype', addVehicleType)
router.delete('/delete/model/:id', deleteModel)
router.post('/add/model', addModel)
router.post('/update/model', updateModel)


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