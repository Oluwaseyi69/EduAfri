const jwtUtil = require('../utils/JwtUtil');

const authMiddleware = {
    authenticate: async (req, res, next) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).send({ error: 'Token missing or invalid' });
            }

            req.user = jwtUtil.verifyToken(token);

            next();
        } catch (error) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    },

};


module.exports = authMiddleware;
