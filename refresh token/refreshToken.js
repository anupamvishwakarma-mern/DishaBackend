const router = require('express').Router();
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'secretkey'
const REFRESH_KEY = 'refreshToken'

router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, REFRESH_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '15m' });

        res.json({ accessToken: newAccessToken });
    });
})


module.exports = router;