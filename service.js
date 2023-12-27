const pool = require('./database');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const { authSchema } = require('./validation');
const uuid = require('uuid')

const SECRET_KEY = 'secretkey'
const REFRESH_KEY = 'refreshToken'

module.exports = {

    adminLogIn: (req, res) => {
        const { email, password } = req.body;

        const q = "SELECT * FROM userlogin WHERE useremail=?"

        pool.query(q, email, (err, rows) => {
            if (err) return res.status(500).json({ error: 'Error retrieving user' });
            if (rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const password2 = rows[0].userpassword;

            bcrypt.compare(password, password2, (error, result) => {
                if (error) return res.status(401).json({ error: 'Authentication Failed' });
                
                if (!result) {
                    return res.status(401).json({ error: 'Password does not match' })
                }

                const token = jwt.sign({ userId: rows[0].user_id }, SECRET_KEY, {
                    expiresIn: '15m'
                })
                const refreshToken = jwt.sign({ userId: rows[0].user_id }, REFRESH_KEY, {
                    expiresIn: '30d'
                })
                const { password, ...data } = rows[0]

                res.cookie('accessToken', token, {
                    httpOnly: true
                }).status(200).json({ data, token, refreshToken });
            })
        })
    },

    // user logout function 
    logout: (req, res) => {

        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json("User has been logged out");
    },


    adminSignUp: async (req, res) => {
        try {

            const result = await authSchema.validateAsync(req.body);

            const checkQuery = 'SELECT * FROM userlogin WHERE useremail = ?'

            pool.query(checkQuery, result.email, (error, row) => {
                if (error) return res.status(500).json({ error: error.sqlMessage })
                if (row.length !== 0) return res.status(200).json({ message: "Email is already exist!" })
                const id = uuid.v4();

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(result.password, salt);

                const insertQuery = 'INSERT INTO userlogin( user_id, username, useremail, userpassword) VALUES (?, ?, ?, ?)';

                pool.query(insertQuery, [id, result.name, result.email, hashedPassword], (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: error.sqlMessage });
                    }
                    const selectQuery = 'SELECT * FROM userlogin WHERE useremail=?';

                    pool.query(selectQuery, [result.email], (err, result) => {
                        if (err) {
                            return res.status(500).json({ error: err.sqlMessage });
                        }
                        return res.status(200).json(result[0]);
                    });
                });
            })
        } catch (error) {
            res.status(500).json({ error: error.sqlMessage });
        }
    },

    updateAdminInfo: (req, res) => {

        const { name, contact, dob } = req.body;

        const updateQuery = 'UPDATE admin SET Name = ?, Contact=?, dob=? Where admin_id = ?'

        pool.query(updateQuery, [name, userInfo.id, contact, dob], (error, result) => {
            if (error) return res.status(500).json({ error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM admin WHERE admin_id = ?'

            pool.query(selectQuery, id, (err, finalResult) => {
                if (err) return res.status(500).json({ error: 'Internal Server Error' })

                return res.status(200).json(finalResult[0]);
            })
        })
    },


    createNewUser: (req, res) => {
        try {
            const { name, email, password, contact, dob } = req.body;

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const id = uuid.v4()

            const insertQuery = 'INSERT INTO userlogin(user_id, username, useremail, userpassword, contact, dob) VALUES (?, ?, ?, ?, ?, ?)';

            pool.query(insertQuery, [id, name, email, hashedPassword, contact, dob], (error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Internal Server Error1' });
                }

                const selectQuery = 'SELECT user_id, username, useremail, contact, dob FROM userlogin';

                pool.query(selectQuery, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal Server Error2' });
                    }

                    return res.status(200).json(result);
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Errors' });
        }
    },


    updateUserInfo: (req, res) => {
        const { name, contact, email, dob, userId } = req.body;

        const updateQuery = 'UPDATE userlogin SET username = ?, useremail=?, contact=?, dob=? Where user_id = ?'

        pool.query(updateQuery, [name, email, contact, dob, userId], (error, result) => {
            if (error) return res.status(500).json({ error: 'Internal Server Error' })

            const selectQuery = 'SELECT * FROM userlogin'

            pool.query(selectQuery, (err, finalResult) => {
                if (err) return res.status(500).json({ error: 'Internal Server Error' })

                return res.status(200).json(finalResult);
            })
        })
    },


    updatePassword: (req, res) => {
        const { id, email, password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const updateQuery = 'UPDATE userlogin SET userpassword = ? WHERE user_id = ? AND useremail = ?'

        pool.query(updateQuery, [hashedPassword, id, email], (error, result) => {
            if (error) return res.status(500).json({ error: 'Internal Server Error' })

            return res.status(200).json('Password is updated');
        })
    },

    accessAllUsers: (req, res) => {

        const selectQuery = 'SELECT user_id, username, useremail, contact, dob FROM userlogin';

        pool.query(selectQuery, (error, result) => {
            if (error) return res.status(404).json({ error: 'Internal server error' })
            return res.status(200).json(result);
        })
    },


    deleteUser: (req, res) => {
        const id = req.params.id;

        const deleteQuery = 'DELETE FROM userlogin WHERE user_id = ?'

        pool.query(deleteQuery, id, (error, result) => {
            if (error) {
                return res.status(404).json({ error: "Internal server error" })
            }
            const selectQuery = 'SELECT * FROM userlogin'

            pool.query(selectQuery, (err, finalResult) => {
                if (err) return res.status(500).json({ error: 'Internal Server Error' })

                return res.status(200).json(finalResult);
            })
        })
    },


    sendMail: (req, res) => {
        const { to, subject, text } = req.body;

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akv59199@gmail.com', // Replace with your Gmail email
                pass: 'kywb smye fipx uiwr', // Replace with your Gmail password or an app-specific password
            },
        });

        // Define email options
        const mailOptions = {
            from: 'akv59199@gmail.com', // Replace with your Gmail email
            to,
            subject,
            text,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json('No recipients defined');
            }

            res.status(200).send('Email sent successfully');
        });
    },

    searchUsers: (req, res) => {
        const search = req.params.search;

        const searchQuery = `SELECT * FROM userlogin WHERE username LIKE '%${search}%' OR useremail LIKE '%${search}%'`;

        pool.query(searchQuery, (error, result) => {
            if (error) return res.status(500).json({ error: 'Internal Server Error' })

            return res.status(200).json(result);
        })
    }

}