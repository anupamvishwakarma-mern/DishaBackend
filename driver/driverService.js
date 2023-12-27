const pool = require('../database')
const uuid = require('uuid');


module.exports = {


    getDriver: (req, res) => {
        const selectData = 'SELECT * FROM driver'

        pool.query(selectData, (errors, rows) => {
            if (errors) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(rows);
        })
    },

    searchDriver: (req, res) => {
        const search = req.params.search;

        const selectData = `SELECT * FROM driver WHERE name LIKE '%${search}%' OR email LIKE '%${search}%'`

        pool.query(selectData, (errors, rows) => {
            if (errors) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(rows);
        })
    },

    addDriver: (req, res) => {

        const data = req.body;
        const name = data.srName + ' ' + data.fName + ' ' + data.lName;

        const selectQuery = "SELECT * FROM driver WHERE name = ? AND email=?"

        pool.query(selectQuery, [name, data.email], async (error, result) => {
            if (error) return res.status(404).json({ error: "Internal server error" })
            if (result.length !== 0) return res.status(200).json({ message: "Data is already exist" })

            const id = uuid.v4();

            const insertQuery = "INSERT INTO driver(driver_id, name, gender, email, mobile, guardian, dob, adhaar, pan, designation, p_address, p_city, p_pin, l_address, l_city, l_pin, job_type, department, team, company, branch, file, description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

            const reqData = [
                id,
                name,
                data.gender,
                data.email,
                data.mobile,
                data.guardian,
                data.dob,
                data.adhaar,
                data.pan,
                data.designation,
                data.pAddress,
                data.pCity,
                data.pPin,
                data.lAddress,
                data.lCity,
                data.lPin,
                data.jobType,
                data.department,
                data.team,
                data.company,
                data.branch,
                data.file,
                data.description
            ]

            pool.query(insertQuery, reqData, (err, results) => {
                if (err) return res.status(404).json({ Error: "Internal server error" })

                const selectData = 'SELECT * FROM driver'

                pool.query(selectData, (errors, rows) => {
                    if (errors) res.status(404).json({ Error: "Internal server error" })

                    return res.status(200).json(rows);
                })
            })
        })
    },


    updateDriver: (req, res) => {
        const data = req.body;
        const name = data.srName + ' ' + data.fName + ' ' + data.lName;
        const updateQuery = 'UPDATE driver SET name=?, gender=?, email=?, mobile=?, guardian=?, dob=?, adhaar=?, pan=?, designation=?, p_address=?, p_city=?, p_pin=?, l_address=?, l_city=?, l_pin=?, job_type=?, department=?, team=?, company=?, branch=?, file=?, description=? WHERE driver_id=?'

        const body = [
            name,
            data.gender,
            data.email,
            data.mobile,
            data.guardian,
            data.dob,
            data.adhaar,
            data.pan,
            data.designation,
            data.pAddress,
            data.pCity,
            data.pPin,
            data.lAddress,
            data.lCity,
            data.lPin,
            data.jobType,
            data.department,
            data.team,
            data.company,
            data.branch,
            data.file,
            data.description,
            data.driverId
        ]

        pool.query(updateQuery, body, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            const selectQuery = `SELECT * FROM driver`

            pool.query(selectQuery, data.driverId, (err, rows) => {
                if (err) res.status(404).json({ Error: "Internal server error" })

                return res.status(200).json(rows);
            })
        })
    },


    driverDelete: (req, res) => {
        const id = req.params.id;

        const deleteQuery = `DELETE FROM driver WHERE driver_id=?`

        pool.query(deleteQuery, id, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            const selectQuery = `SELECT * FROM driver`

            pool.query(selectQuery, (err, rows) => {
                if (err) res.status(404).json({ Error: "Internal server error" })

                return res.status(200).json(rows);
            })
        })
    },


    getCompany: (req, res) => {
        const selectQuery = "SELECT * FROM company";

        pool.query(selectQuery, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(result);
        })
    },


    getBranch: (req, res) => {
        const company = req.params.company;

        const selectQuery = `SELECT sr_no, branch FROM branch WHERE name=?`;

        pool.query(selectQuery, company, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(result);
        })
    },


    getTeam: (req, res) => {
        const selectQuery = "SELECT * FROM team";

        pool.query(selectQuery, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(result);
        })
    },


    getDepartment: (req, res) => {
        const selectQuery = "SELECT * FROM department";

        pool.query(selectQuery, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(result);
        })
    },


    getCity: (req, res) => {
        const selectQuery = "SELECT * FROM city";

        pool.query(selectQuery, (error, result) => {
            if (error) res.status(404).json({ Error: "Internal server error" })

            return res.status(200).json(result);
        })
    },
}














// generate id for drivers
function generateId(name) {
    const id = name.slice(0, 3) + Math.floor(Math.random() * (999 - 100) + 10);

    return new Promise((resolve, reject) => {
        const selectId = `SELECT driver_id FROM driver WHERE driver_id=?`;
        pool.query(selectId, id, (idErr, idRes) => {
            if (idErr) {
                reject("Internal server error");
                return;
            }

            if (idRes.length !== 0) {
                // If the generated ID already exists, recursively call the function
                resolve(generateId(name));
            } else {
                resolve(id);
            }
        });
    });
}