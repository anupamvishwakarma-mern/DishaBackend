const pool = require('../../database')
const uuid = require('uuid')


module.exports = {

    addVendor: (req, res) => {
        const body = req.body;
        const id = uuid.v4()

        const insertQuery = 'INSERT INTO vendor(_id, vendor_name, contact_person, email, mobile, GSTIN, pan_no, source_supply, address, city, pin_no, website, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const data = [
            id,
            body.vendorName,
            body.contPerson,
            body.email,
            body.mobile,
            body.gstin,
            body.pan,
            body.supply,
            body.address,
            body.city,
            body.pin,
            body.website,
            body.description
        ]

        pool.query(insertQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM vendor'

            pool.query(selectQuery, (err, results) => {
                if (err) return res.status(404).json({ error: "Internal server error" });

                return res.status(200).json(results);
            })
        })
    },

    updateVendor: (req, res) => {
        const body = req.body;

        const updateQuery = 'UPDATE vendor SET vendor_name=?, contact_person=?, email=?, mobile=?, GSTIN=?, pan_no=?, source_supply=?, address=?, city=?, pin_no=?, website=?, description=? WHERE _id=?'
        const data = [
            body.vendorName,
            body.contPerson,
            body.email,
            body.mobile,
            body.gstin,
            body.pan,
            body.supply,
            body.address,
            body.city,
            body.pin,
            body.website,
            body.description,
            body.id
        ]

        pool.query(updateQuery, data, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM vendor'

            pool.query(selectQuery, (err, results) => {
                if (err) return res.status(404).json({ Error: "Internal server error" });

                return res.status(200).json(results);
            })
        })
    },


    getVendor: (req, res) => {
        const selectQuery = 'SELECT * FROM vendor'

        pool.query(selectQuery, (err, results) => {
            if (err) return res.status(404).json({ Error: "Internal server error" });

            return res.status(200).json(results);
        })
    },

    searchVendor: (req, res) => {
        const search = req.params.search;

        const selectQuery = `SELECT * FROM vendor WHERE vendor_name LIKE '%${search}%' OR email LIKE '%${search}%' OR pan_no LIKE '%${search}%' OR GSTIN LIKE '%${search}%'`

        pool.query(selectQuery, (err, results) => {
            if (err) return res.status(404).json({ Error: "Internal server error" });

            return res.status(200).json(results);
        })
    },

    deleteVendor: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM vendor WHERE _id=?`;

        pool.query(deleteQuery, id, (error, result) => {
            if (error) return res.status(400).json({ Error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM vendor';

            pool.query(selectQuery, (err, results) => {
                if (err) return res.status(404).json({ Error: "Internal server error" });

                return res.status(200).json(results);
            })
        })
    }
}

