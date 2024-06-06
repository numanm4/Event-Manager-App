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

const deleteData = async (eventName, callback) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    request.input('eventName', sql.NVarChar, eventName);

    const query = `
      DELETE FROM Events
      WHERE eventName = @eventName
    `;

    await request.query(query);
    callback(null);

  } catch (err) {
    console.error('Error while deleting data:', err);
    callback(err);
  }
};

module.exports = {
  deleteData,
};
