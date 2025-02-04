const express = require('express');   // Import Express.js
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const jwt = require('jsonwebtoken');  // Import JWT for token authentication
const bcrypt = require('bcryptjs');   // Import bcrypt for password hashing
require('dotenv').config();           // Load environment variables from .env file

const app = express();  // Create an Express app
app.use(express.json()); // Enable JSON body parsing

mongoose.connect('mongodb://localhost:27017/auth-demo'); // Connect to MongoDB

// Define User Schema and Model
const UserSchema = new mongoose.Schema({
    username: String,      // Store username
    password: String       // Store hashed password
});
const User = mongoose.model('User', UserSchema); // Create Mongoose model
