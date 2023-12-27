const pool = require('../../database')
const uuid = require('uuid')


module.exports = {

    addDocuments: (req, res) => {
        const body = req.body;
        const id = uuid.v4();
        pool.query(`SELECT sr_no FROM documents ORDER BY sr_no DESC LIMIT 1`, (error, n) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })
            let nextId = ++n[0].sr_no;
            const docsId = ('DOCS' + nextId.toString().padStart(6, '0'));

            const insertQuery = 'INSERT INTO documents(_id, docs_no, docs_name, vehicle_no, reference, issue_date, renewable, paid, document, description) VALUES(?,?,?,?,?,?,?,?,?,?)';
            const data = [
                id,
                docsId,
                body.docsName,
                body.vehicleNo,
                body.reference,
                body.issueDate,
                body.renewable,
                body.paid,
                body.document,
                body.description,
            ]

            pool.query(insertQuery, data, (error, result) => {
                if (error) return res.status(400).json({ Error: 'Internal Server Error' })

                const selectQuery = 'SELECT * FROM documents';

                pool.query(selectQuery, (err, rows) => {
                    if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                    return res.status(200).json(rows);
                })
            })
        })
    },

    updateDocument: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE documents SET docs_name=?, vehicle_no=?, reference=?, issue_date=?, renewable=?, paid=?, document=?, description=? WHERE _id=?';
        const data = [
            body.docsName,
            body.vehicleNo,
            body.reference,
            body.issueDate,
            body.renewable,
            body.paid,
            body.document,
            body.description,
            body._id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM documents';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    getDocuments: (req, res) => {
        const selectQuery = 'SELECT * FROM documents';

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },

    deleteDocument: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM documents WHERE _id=?`;

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM documents';

            pool.query(selectQuery, (err, rows) => {
                if (err) return res.status(400).json({ Error: 'Internal Server Error' });

                return res.status(200).json(rows);
            })
        })
    },

    searchDocuments: (req, res) => {
        const search = req.params.search

        const selectQuery = `SELECT * FROM documents WHERE vehicle_no LIKE '%${search}%'`;

        pool.query(selectQuery, (err, rows) => {
            if (err) return res.status(400).json({ Error: 'Internal Server Error' });

            return res.status(200).json(rows);
        })
    },
}
