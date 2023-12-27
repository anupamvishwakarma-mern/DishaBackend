const pool = require('../database')
const uuid = require('uuid')

module.exports = {

    addFuel: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO fuel(_id, entry_no, vehicle_no, oil_type, vendor, date, qnty, rate, amount, odometer, file, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        const data = [
            id,
            body.entryNo,
            body.vehicleNo,
            body.oilType,
            body.vendor,
            body.date,
            body.qnty,
            body.rate,
            body.amount,
            body.odometer,
            body.file,
            body.description,
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ error: 'Internal Server Error' });

            const selectQuery = 'SELECT * FROM fuel';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    getFuel: (req, res) => {
        const selectQuery = 'SELECT * FROM fuel';

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },


    searchFuel: (req, res) => {
        const search = req.params.search;

        const selectQuery = `SELECT * FROM fuel WHERE vehicle_no LIKE '%${search}%' OR vendor LIKE '%${search}%'`;

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },


    updateFuel: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE fuel SET entry_no=?, vehicle_no=?, oil_type=?, vendor=?, date=?, qnty=?, rate=?, amount=?, odometer=?, file=?, description=? WHERE _id=?';
        const data = [
            body.entryNo,
            body.vehicleNo,
            body.oilType,
            body.vendor,
            body.date,
            body.quantity,
            body.rate,
            body.amount,
            body.odometer,
            body.file,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ error: 'Internal Server Error' });

            const selectQuery = 'SELECT * FROM fuel';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    deleteFuel: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM fuel WHERE _id=?`;

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(400).json({ error: 'Internal Server Error' });

            const selectQuery = 'SELECT * FROM fuel';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    }

}