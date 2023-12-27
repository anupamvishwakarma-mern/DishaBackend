const pool = require('../../database')
const uuid = require('uuid')


module.exports = {

    addMaster: (req, res) => {
        const body = req.body;
        const id = uuid.v4();

        const insertQuery = 'INSERT INTO master(_id, master_name, master_type, other, description) VALUES(?,?,?,?,?)';
        const data = [
            id,
            body.masterName,
            body.masterType,
            body.other,
            body.description
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM master'

            pool.query(selectQuery, (err, results) => {
                if (err) return res.status(404).json({ error: "Internal server error" });

                return res.status(200).json(results);
            })
        })
    },

    updateMaster: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE master SET master_name=?, master_type=?, other=?, description=? WHERE _id=?';
        const data = [
            body.masterName,
            body.masterType,
            body.other,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM master'

            pool.query(selectQuery, (err, results) => {
                if (err) return res.status(404).json({ error: "Internal server error" });

                return res.status(200).json(results);
            })
        })
    },

    getMaster: (req, res) => {
        const selectQuery = 'SELECT * FROM master'

        pool.query(selectQuery, (err, results) => {
            if (err) return res.status(404).json({ error: "Internal server error" });

            return res.status(200).json(results);
        })
    },

    searchMaster: (req, res) => {
        const search = req.params.search;

        const selectQuery = `SELECT * FROM master WHERE master_name LIKE '%${search}%' OR other LIKE '%${search}%'`;

        pool.query(selectQuery, (err, results) => {
            if (err) return res.status(404).json({ error: "Internal server error" });

            return res.status(200).json(results);
        })
    },

    deleteMaster: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM master WHERE _id=?`;

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM master'

            pool.query(selectQuery, (err, results) => {
                if (err) return res.status(404).json({ error: "Internal server error" });

                return res.status(200).json(results);
            })
        })
    }
}
