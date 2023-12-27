const pool = require('./database');
const uuid = require('uuid');


module.exports = {

    addNew: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const createQuery = 'INSERT INTO vehicles(_id, vehicle_no, model, vehicle_type, body_type, ownership, weight, engine_no, chessis_no, odometer, pic, rc, description ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

        const data = [
            id,
            body.vehicleNo,
            body.model,
            body.vehicleType,
            body.bodyType,
            body.ownership,
            body.weight,
            body.engineNo,
            body.chassisNo,
            body.odometer,
            body.pic,
            body.rc,
            body.description
        ]
        pool.query(createQuery, data, (error, result) => {
            if (error) return res.status(404).json({ error: 'Internal server error' })

            const selectQuery = 'SELECT * FROM vehicles WHERE vehicle_no=? ORDER BY sr_no DESC';

            pool.query(selectQuery, body.vehicleNo, (err, results) => {
                if (err) return res.status(404).json({ error: "Internal server error" });

                return res.status(200).json(results[0]);
            })
        })
    },


    getVehicleData: (req, res) => {

        const selectQuery = "SELECT * FROM vehicles";

        pool.query(selectQuery, (error, data) => {
            if (error) return res.status(404).json({ error: "Internal server error" })
            return res.status(200).json(data);
        })
    },

    searchVehicleData: (req, res) => {
        const search = req.params.search;

        const selectQuery = `SELECT * FROM vehicles WHERE vehicle_no LIKE '%${search}%' OR chessis_no LIKE '%${search}%' OR model LIKE '%${search}%' OR ownership LIKE '%${search}%'`;

        pool.query(selectQuery, (error, data) => {
            if (error) return res.status(404).json({ error: "Internal server error" })
            return res.status(200).json(data);
        })
    },


    updateVehicle: (req, res) => {

        const body = req.body;

        const updateQuery = 'UPDATE vehicles SET vehicle_no=?, model=?, vehicle_type=?, body_type=?, ownership=?, weight=?, engine_no=?, chessis_no=?, odometer=?, pic=?, rc=?, description=? WHERE _id=?';
        const data = [
            body.vehicleNo,
            body.model,
            body.vehicleType,
            body.bodyType,
            body.ownership,
            body.weight,
            body.engineNo,
            body.chassisNo,
            body.odometer,
            body.pic,
            body.rc,
            body.description,
            body.id
        ]
        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            const selectQuery = 'SELECT * FROM vehicles';

            pool.query(selectQuery, (err, data) => {
                if (err) return res.status(404).json({ error: 'Internal server error' });

                return res.status(200).json(data);
            })
        })
    },


    deleteVehicleData: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM vehicles WHERE _id=?`

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(404).json({ error: 'Internal server error' })

            const selectQuery = 'SELECT * FROM vehicles';
            pool.query(selectQuery, (err, selcetResult) => {
                if (err) return res.status(404).json({ error: "Internal server error" });

                return res.status(200).json(selcetResult);
            })
        })
    },


    getVehicleType: (req, res) => {
        const selectQuery = `SELECT * FROM vehicletype`

        pool.query(selectQuery, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            return res.status(200).json(result);
        })
    },



    addModel: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO model(_id, name, brand, Axle, Tire, stepney_tire, tank_capacity, milage, fuel_type, description) VALUES(?,?,?,?,?,?,?,?,?,?)'
        const array = [
            id,
            body.modelName,
            body.brand,
            body.totalAxle,
            body.totalTire,
            body.stepney,
            body.capacity,
            body.milage,
            body.fuleType,
            body.description,
        ]
        pool.query(insertQuery, array, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            const selectQuery = 'SELECT * FROM model WHERE _id=?';

            pool.query(selectQuery, id, (err, row) => {
                if (err) return res.status(404).json({ error: "Internal server error" })

                return res.status(200).json(row[0])
            })
        })
    },
    getVehicleModel: (req, res) => {
        const selectQuery = 'SELECT * FROM model'

        pool.query(selectQuery, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            return res.status(200).json(result);
        })
    },
    searchVehicleModel: (req, res) => {
        const search = req.params.search;

        const selectQuery = `SELECT * FROM model WHERE name LIKE '%${search}%' OR brand LIKE '%${search}%'`

        pool.query(selectQuery, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            return res.status(200).json(result);
        })
    },
    updateModel: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE model SET name=?, brand=?, Axle=?, Tire=?, stepney_tire=?, tank_capacity=?, milage=?, fuel_type=?, description=? WHERE _id=?';
        const data = [
            body.modelName,
            body.brand,
            body.totalAxle,
            body.totalTire,
            body.stepney,
            body.capacity,
            body.milage,
            body.fuelType,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            const selectQuery = 'SELECT * FROM model';

            pool.query(selectQuery, (err, row) => {
                if (err) return res.status(404).json({ error: "Internal server error" })

                return res.status(200).json(row)
            })
        })
    },

    deleteModel: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM model WHERE _id=?`;

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            const selectQuery = 'SELECT * FROM model';

            pool.query(selectQuery, (err, row) => {
                if (err) return res.status(404).json({ error: "Internal server error" })

                return res.status(200).json(row)
            })
        })
    },

    getBodyType: (req, res) => {
        const selectQuery = 'SELECT * FROM bodytype'

        pool.query(selectQuery, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            return res.status(200).json(result);
        })
    },
    getOwnership: (req, res) => {
        const selectQuery = 'SELECT * FROM ownership'

        pool.query(selectQuery, (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })

            return res.status(200).json(result);
        })
    },


    // addVehicleType: (req, res) => {
    //     const type = req.body;

    //     const insertQuery = 'INSERT INTO vehicletype (name) VALUES (?)';

    //     pool.query(insertQuery, type, (error, result) => {
    //         if (error) return res.status(404).json({ error: "Internal server error" })

    //         return res.status(200).json(result);
    //     })
    // },
    // addVehicleModel: (req, res) => {
    //     const model = req.body;

    //     const insertQuery = 'INSERT INTO vehicleModel (name) VALUE (?)';

    //     pool.query(insertQuery, model, (error, result) => {
    //         if (error) return res.status(404).json({ error: "Internal server error" })

    //         return res.status(200).json(result);
    //     })
    // },
    // addBodyType: (req, res) => {
    //     const type = req.body;

    //     const insertQuery = 'INSERT INTO bodytype (name) VALUE (?)';

    //     pool.query(insertQuery, type, (error, result) => {
    //         if (error) return res.status(404).json({ error: "Internal server error" })

    //         return res.status(200).json(result);
    //     })
    // },
    // addOwnership: (req, res) => {
    //     const name = req.body;

    //     const insertQuery = 'INSERT INTO ownership (name) VALUE (?)';

    //     pool.query(insertQuery, name, (error, result) => {
    //         if (error) return res.status(404).json({ error: "Internal server error" })

    //         return res.status(200).json(result);
    //     })
    // },
}