const sql = require('mssql');

// Config for your database
const config = {
  user: "WebDSecondAssessment",
  password: "123456",
  database: "EventManagerDB",
  server: "localhost",
    options: {
      trustServerCertificate: true // change to false for production
    }
  };

// connect to your database
const searchEvents = async (eventName) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('eventName', sql.NVarChar, eventName)
      .query('SELECT * FROM events WHERE eventName = @eventName');
    
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw new Error('An error occurred while querying the database');
  }
}

module.exports = {searchEvents};