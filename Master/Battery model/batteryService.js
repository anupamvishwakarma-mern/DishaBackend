const pool = require('../../database')
const uuid = require('uuid')


module.exports = {

    addBattery: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO battery(_id, model_name, brand, capacity, warranty, description) VALUES(?,?,?,?,?,?)';
        const data = [
            id,
            body.modelName,
            body.brandName,
            body.capacity,
            body.warranty,
            body.description
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM battery';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    updateBattery: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE battery SET model_name=?, brand=?, capacity=?, warranty=?, description=? WHERE _id=?';
        const data = [
            body.modelName,
            body.brandName,
            body.capacity,
            body.warranty,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM battery';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    getBattery: (req, res) => {
        const selectQuery = 'SELECT * FROM battery';

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },

    deleteBattery: (req, res) => {
        const id = req.params.id;

        const updateQuery = `DELETE FROM battery WHERE _id=?`;

        pool.query(updateQuery,id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM battery';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    searchBattery: (req, res) => {
        const search = req.params.search
        const selectQuery = `SELECT * FROM battery WHERE model_name LIKE '%${search}%' OR brand LIKE '%${search}%'`;

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },
}
