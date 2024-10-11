const userService = require('../services/UserService');

const adminController = {
    signUp: async (req, res) => {
        try {
            const user = await userService.signUp(req.body);
            return res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    signIn: async (req, res) => {
        try {
            const { token, user } = await userService.signIn(req.body);
            return res.status(200).json({ message: 'Login successful', token, user });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async changePassword(req, res) {
        const userEmail = req.user.email
        console.log('UserId', userEmail)
        // const { oldPassword, newPassword } = req.body;

        try {
            const result = await userService.changePassword(userEmail, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

};

module.exports = adminController;
