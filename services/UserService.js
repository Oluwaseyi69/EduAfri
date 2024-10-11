const jwtUtil = require('../utils/JwtUtil');
const bcryptUtil = require('../utils/BcryptUtil')
const UserRepository = require('../repositories/UserRepository');
const crypto = require('crypto');
require('dotenv').config();




class UserService {


    // Register a regular user
    async signUp(signUpDto) {


        if (!signUpDto.username) {
            throw new Error("Username is required");
        }
        const existingUser = await UserRepository.findByEmail(signUpDto.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcryptUtil.hashPassword(signUpDto.password, 10);
        const userRole = signUpDto.role || 'student';

        const user = {
            username: signUpDto.username,
            email: signUpDto.email,
            password: hashedPassword,
            role: userRole,

        };

        await UserRepository.create(user);
        const token = jwtUtil.generateToken({
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
        });



        return {
            Token: token,
            message: 'Registered successfully',
            userId: user.id,
            user: user.username,
            role: user.role
        };
    }



    async  signIn(signInDto) {
        const { email, password } = signInDto;

        // Check if email and password are provided
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        // Check if the user exists in the database
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("User with this email does not exist");
        }

        // Verify the password
        const isPasswordValid = await bcryptUtil.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const token = jwtUtil.generateToken({
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
        });

        return {
            token,
            message: 'Logged in successfully',
            user: user.username,
            role: user.role
        };
    }
    async changePassword(userEmail, changePasswordDto) {
        const { oldPassword, newPassword } = changePasswordDto;
        console.log('changePassword', changePasswordDto)
        console.log("New password",newPassword);
        console.log("Old password", oldPassword);
        if(!oldPassword) {
            throw new Error("Old password is required");
        }
        if (!newPassword) {
            throw new Error("New password is required");
        }


        // Find the user by ID
        const user = await UserRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("User does not exist");
        }

        // Validate the old password
        const isPasswordValid = await bcryptUtil.comparePasswords(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new Error("Old password is incorrect");
        }

        // Hash the new password
        const hashedNewPassword = await bcryptUtil.hashPassword(newPassword, 10);

        // Update the user's password
        await UserRepository.update( user._id,{ password: hashedNewPassword });

        return {
            message: 'Password changed successfully',
            user: user.username,
        };
    }
}

module.exports = new UserService();
