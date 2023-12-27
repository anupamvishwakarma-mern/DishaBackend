const pool = require('../../database')
const uuid = require('uuid')


module.exports = {

    addService: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO service(_id, category, type, department, description) VALUES(?,?,?,?,?)';
        const data = [
            id,
            body.category,
            body.type,
            body.department,
            body.description
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM service';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    updateService: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE service SET category=?, type=?, department=?, description=? WHERE _id=?';
        const data = [
            body.category,
            body.type,
            body.department,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM service';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    getService: (req, res) => {
        const selectQuery = 'SELECT * FROM service';

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },

    deleteService: (req, res) => {
        const id = req.params.id;

        const updateQuery = `DELETE FROM service WHERE _id=?`;

        pool.query(updateQuery, id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM service';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    searchService: (req, res) => {
        const search = req.params.search
        const selectQuery = `SELECT * FROM service WHERE category LIKE '%${search}%' OR type LIKE '%${search}%' OR department LIKE '%${search}%'`;

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },
}
