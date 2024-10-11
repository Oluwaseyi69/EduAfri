require('dotenv').config();

const express = require('express')
const app = express()
const connectDB = require('./config/db');
const authRoutes = require('./routes/AuthRoutes')
const courseRoutes = require('./routes/CourseRoutes')
const studentRoutes = require('./routes/StudentRoutes')
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT;

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});