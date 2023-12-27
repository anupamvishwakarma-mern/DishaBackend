const jwt = require('jsonwebtoken')
const {
    adminLogIn,
    adminSignUp,
    updateUserInfo,
    updateAdminInfo,
    createNewUser,
    accessAllUsers,
    deleteUser,
    sendMail,
    logout,
    updatePassword,
    searchUsers} = require("./service");

const router = require('express').Router();


router.post('/signup', adminSignUp);
router.post('/login', adminLogIn);
router.post('/logout', logout);
router.post('/update', updateAdminInfo);
router.post('/update/user', updateUserInfo);
router.post('/createuser', createNewUser);
router.get('/get/userdata', verifyToken, accessAllUsers);
router.get('/get/userdata:search', verifyToken, searchUsers);
router.delete('/userdata/delete/:id',verifyToken, deleteUser);
router.post('/update/password', updatePassword);

router.post('/email/send', sendMail)



function verifyToken(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Token is not valid' });
        }

        req.user = userInfo;
        next();
    });
}


module.exports = router;