/** Shared config for application; can be req'd many places. */

require('dotenv').config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

const DB_PORT = +process.env.DB_PORT || 27017;

let DB_NAME;

if (process.env.NODE_ENV === 'test') {
  DB_NAME = 'test_basketball_db';
} else {
  DB_NAME = process.env.DATABASE_URL || 'basketball_db';
}

let DB_URI = `mongodb://localhost:${DB_PORT}`;

module.exports = {
  SECRET,
  PORT,
  DB_NAME,
  DB_PORT,
  DB_URI
};
