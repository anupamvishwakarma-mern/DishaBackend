const jwt = require('jsonwebtoken');

const { getDocuments, updateDocument, addDocuments, deleteDocument, searchDocuments } = require('./Service');

const router = require('express').Router();

router.post('/add', addDocuments)
router.post('/update', updateDocument)
router.get('/get', verifyToken, getDocuments)
router.delete('/delete:id', deleteDocument)
router.get('/get:search', verifyToken, searchDocuments)


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


module.exports = router