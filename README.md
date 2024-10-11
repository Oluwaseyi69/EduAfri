EduAfri
Overview

This project is an Education Platform that allows students to enroll in courses, track their progress, and submit reviews for courses they have taken. 
Instructors can create courses, manage content, and track student enrollment. The platform provides features for authentication, course management, and review submissions,
ensuring a seamless educational experience for both students and instructors.

**Key Features**

    User Authentication: Secure login and registration system with JWT tokens.
    User Roles: Supports two types of users: Students and Instructors.
    Course Enrollment: Students can enroll in available courses.
    Course Management: Instructors can create and manage courses.
    Review System: Students can leave reviews and ratings for courses they’ve enrolled in.
    Data Persistence: MongoDB is used for storing user data, courses, and reviews.
    Error Handling: All routes and services implement error handling for validation and operations.

**Tech Stack**

    Backend: Node.js, Express.js
    Database: MongoDB (Mongoose for data modeling)
    Authentication: JWT (JSON Web Tokens) for secure authentication
    Security: Bcrypt for password hashing
    Environment Variables: Dotenv for configuration management

Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.
Prerequisites

Ensure you have the following installed on your machine:

    Node.js (v12 or higher)
    MongoDB (Ensure MongoDB is running locally or use a cloud service like MongoDB Atlas)
    Git

  1. Installation

    Clone the Repository:

    bash


 2. Navigate to the Project Directory:

 3. cd education-platform

    **Install Dependencies:**
    
    Run the following command to install all required Node.js packages:
    
    bash
    
    npm install
    
    Create a .env file:
    
    In the root of the project, create a .env file to store your environment variables. Example .env file:
    
    **makefile**
    
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/EduAfri
    JWT_SECRET=your_secret_key
    
    Run the Application:
    
    Start the server:
    
    
    npm start
