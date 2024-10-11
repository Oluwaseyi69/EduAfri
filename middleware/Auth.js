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

// const jwt = require('jsonwebtoken');
// const UserRepository = require('../repositories/UserRepository');
//
// const authenticateUser = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//
//         if (!token) {
//             return res.status(401).json({ message: "No token, authorization denied" });
//         }
//
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//
//         // Find the user by ID from the token's payload
//         const user = await UserRepository.findById(decoded._id);
//         if (!user) {
//             return res.status(401).json({ message: "User not found" });
//         }
//
//         // Attach the user to the req object
//         req.user = user;
//
//         next(); // Continue to the next middleware/controller
//     } catch (error) {
//         res.status(401).json({ message: "Token is not valid", error: error.message });
//     }
// };
//
// module.exports = authenticateUser;
