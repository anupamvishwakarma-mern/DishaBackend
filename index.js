const express = require('express');
const cors = require('cors');
const multer = require('multer')
const path = require('path');

const app = express();

const userRouter = require('./Routers');
const vehicleRouter = require('./vehicle routers')
const driverRouter = require('./driver/driverRouter')
const refreshRouter = require('./refresh token/refreshToken');
const fuelRouter = require('./fuel entry/FuelRouter')
const vendorRouter = require('./Master/vendor/RouterV')
const masterRouter = require('./Master/masters/RouterM')
const tireRouter = require('./Master/tire model/tireModelRouter')
const batteryRouter = require('./Master/Battery model/batteryRouter')
const odometerRouter = require('./odometer/routerOdo')
const documentRouter = require('./documents/docRouter')
const serviceRouter = require('./Maintenance/service category/routers')

const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true            //access-control-allow-credentials:true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Mount the userRouter under the "/api" route
app.use('/api', userRouter);
app.use('/vehicle', vehicleRouter);
app.use('/driver', driverRouter);
app.use('/fuel', fuelRouter)
app.use('/vendor', vendorRouter)
app.use('/master', masterRouter)
app.use('/tire/model', tireRouter)
app.use('/battery', batteryRouter)
app.use('/odometer', odometerRouter)
app.use('/document', documentRouter)
app.use('/service', serviceRouter)

// Refresh token 
app.use('/refresh', refreshRouter)


const PORT = process.env.PORT || 8899;
// Start the server on port 8899
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});







const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../admin-default/public/rc");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '_' + path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
});


app.use('/upload/rc', upload.single('rc'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


const storage_2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../admin-default/public/pic");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '_' + path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload_pic = multer({
    storage: storage_2,
});


app.use('/upload/pic', upload_pic.single('pic'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


// driver file
const storage_3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../admin-default/public/driver");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '_' + path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload_driver = multer({
    storage: storage_3,
});

app.use('/upload/driver', upload_driver.single('driver'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


// fuel attachment file
const storage_4 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../admin-default/public/fuel");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '_' + path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload_fuel = multer({
    storage: storage_4,
});

app.use('/upload/fuel', upload_fuel.single('fuel'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


// Document file
const storage_5 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../admin-default/public/Docs");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '_' + path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload_docs = multer({
    storage: storage_5,
});

app.use('/upload/docs', upload_docs.single('docs'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});
