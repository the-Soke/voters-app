// User model for the EventEase Management System
// This model defines the structure of the User table in the database
// It includes fields for name, email, password, and role
// It uses Sequelize ORM for database interactions

import { DataTypes } from 'sequelize'; // Import DataTypes from Sequelize
import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js';
import Candidate from './candidate.js';

// Define the User model with its attributes and constraints
const Vote = sequelize.define('Vote',{});

User.hasOne(Vote);
Vote.belongsTo(User);

Candidate.hasMany(Vote);
Vote.belongsTo(Candidate);

export default Vote;
