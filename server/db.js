"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    this.createTable()
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text,
        wallets text
      )
    `;
    return this.db.run(sql);
  }

  selectByEmail(email, callback) {
    return this.db.get(
      'SELECT * FROM user WHERE email = ?',
      email, (err, row) => {
        callback(err, row)
      })
  }

  registerUser(user, callback) {
    return this.db.run(
      'INSERT INTO user (name, email, password) VALUES (?,?,?)',
      user, (err) => {
        callback(err)
      })
  }

  updateUserWallets(user, callback) {
    return this.db.run(
      'UPDATE user SET wallets = ? WHERE email = ?',
      user, (err) => {
        callback(err)
      })
  }
}

module.exports = Db;
