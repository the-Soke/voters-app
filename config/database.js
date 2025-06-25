import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database in development mode
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // console.log("DB Credentials:", {
    //   name: process.env.DB_NAME,
    //   user: process.env.DB_USER,
    //   pass: process.env.DB_PASSWORD ? "✔️ Password Set" : "❌ Password Missing",
    //   host: process.env.DB_HOST,
    //   dialect: process.env.DB_DIALECT,
    // });

    process.exit(1);
  }
};


export default sequelize;