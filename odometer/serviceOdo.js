const pool = require('../database')
const uuid = require('uuid')


module.exports = {

    addOdometer: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO odometer(_id, odomtr_reading, replace_reading, reading_date, vehicle_no, meter_type, source, source_reference, description) VALUES(?,?,?,?,?,?,?,?,?)';
        const data = [
            id,
            body.odomtrReading,
            body.replaceReading,
            body.readingDate,
            body.vehicleNo,
            body.meterType,
            body.source,
            body.reference,
            body.description
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM odometer';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    updateOdometer: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE odometer SET odomtr_reading=?, replace_reading=?, reading_date=?, vehicle_no=?, meter_type=?, source=?, source_reference=?, description=? WHERE _id=?';
        const data = [
            body.odomtrReading,
            body.replaceReading,
            body.readingDate,
            body.vehicleNo,
            body.meterType,
            body.source,
            body.reference,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM odometer';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    getOdometer: (req, res) => {
        const selectQuery = 'SELECT * FROM odometer';

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },

    deleteOdometer: (req, res) => {
        const id = req.params.id;

        const updateQuery = `DELETE FROM odometer WHERE _id=?`;

        pool.query(updateQuery, id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM odometer';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    searchOdometer: (req, res) => {
        const search = req.params.search
        const selectQuery = `SELECT * FROM odometer WHERE vehicle_no LIKE '%${search}%' OR reading_date LIKE '%${search}%'`;

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },
}
