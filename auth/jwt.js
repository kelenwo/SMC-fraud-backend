const jwt = require('jsonwebtoken');

const auth = (user) => {
    const data = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(data, 'smc-db-secret-key', {expiresIn: '24h'})
}

const validate = (req, res) => {
    const token = req.header('X-Auth-Token');
    console.log(token)
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'smc-db-secret-key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;

        res.status(200).json(user);

    });
}

module.exports =  {
    auth,
    validate
};