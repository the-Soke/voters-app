// User model for the EventEase Management System
// This model defines the structure of the User table in the database
// It includes fields for name, email, password, and role
// It uses Sequelize ORM for database interactions

import { DataTypes } from 'sequelize'; // Import DataTypes from Sequelize
import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Define the User model with its attributes and constraints
const Candidate = sequelize.define(
  'Candidate',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    party: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
    type: DataTypes.STRING,
    allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ Automatically set creation timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ Automatically set update timestamp
    },
  },
  {
    timestamps: true, // ✅ Enables automatic handling of createdAt & updatedAt
  }
);

// Ensure that when data is pulled, certain sensitive data are not sent back
Candidate.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.resetPasswordToken;
  delete values.resetPasswordExpires;
  return values;
};

export default Candidate;
