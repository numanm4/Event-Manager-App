const sql = require('mssql');

const config = {
  user: "WebDSecondAssessment",
  password: "123456",
  database: "EventManagerDB",
  server: "localhost",
  options: {
    trustServerCertificate: true // change to false for production
  }
};

const insertData = async (eventData, callback) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    const { eventName, description, eventDate, eventTime, location } = eventData;

    request.input('eventName', sql.NVarChar, eventName);
    request.input('description', sql.NVarChar, description);
    request.input('eventDate', sql.Date, eventDate);
    request.input('eventTime', sql.NVarChar, eventTime);
    request.input('location', sql.NVarChar, location);

    const query = `
      INSERT INTO events (eventName, [description], eventDate, eventTime, [location])
      VALUES (@eventName, @description, @eventDate, @eventTime, @location)
    `;
    await request.query(query);
    callback(null);

  } catch (err) {
    console.error('Error inserting data:', err);
    callback(err);
  }
};

module.exports = {
  insertData,
};
