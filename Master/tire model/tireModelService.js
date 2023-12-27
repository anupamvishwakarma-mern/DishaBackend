const pool = require('../../database')
const uuid = require('uuid')


module.exports = {

    addTireModel: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO tiremodel(_id, model_name, model_brand, tire_size, tire_type, NSD, position, presure, tire_pattern, aspect_ratio, total_run, description) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        const data = [
            id,
            body.modelName,
            body.modelBrand,
            body.tireSize,
            body.tireType,
            body.NSD,
            body.position,
            body.presure,
            body.tirePattern,
            body.aspectRatio,
            body.totalRun,
            body.description
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' });

            const selectQuery = 'SELECT * FROM tiremodel';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    updateTireModel: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE tiremodel SET model_name=?, model_brand=?, tire_size=?, tire_type=?, NSD=?, position=?, presure=?, tire_pattern=?, aspect_ratio=?, total_run=?, description=? WHERE _id=?';
        const data = [
            body.modelName,
            body.modelBrand,
            body.tireSize,
            body.tireType,
            body.NSD,
            body.position,
            body.presure,
            body.tirePattern,
            body.aspectRatio,
            body.totalRun,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' });

            const selectQuery = 'SELECT * FROM tiremodel';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    getTireModel: (req, res) => {
        const selectQuery = 'SELECT * FROM tiremodel';

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },

    deleteTireModel: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM tiremodel WHERE _id=?`;

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' });

            const selectQuery = 'SELECT * FROM tiremodel';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    searchTireModel: (req, res) => {
        const search = req.params.search;

        const searchQuery = `SELECT * FROM tiremodel WHERE model_name LIKE '%${search}%' OR model_brand LIKE '%${search}%'`;

        pool.query(searchQuery, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(result);
        })
    }
}