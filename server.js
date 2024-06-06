const express = require('express');
const bodyParser = require('body-parser');
const { insertData } = require('./public/insertEvent');
const { deleteData } = require('./public/deleteEvent');
const { updateData } = require('./public/updateEvent');
const { searchEvents } = require('./public/searchEvent');
const { notifyAdmin } = require('./public/sendEmail');


const app = express();


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/delete-event', function (req, res) {
    console.log('Received request to delete Event')
    res.sendFile(__dirname + '/public/deleteEvent.html');
});


app.get('/form', function (req, res) {
    console.log('Received request to insert Event');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/send-email', (req, res) => {
    ('Received request to send email')
      res.sendFile(__dirname + '/public/sendEmail.html');
  });

app.get('/update-event', function (req, res) {
  console.log('Received request to update Event')
    res.sendFile(__dirname + '/public/updateEvent.html');
});


app.get('/search-event', (req, res) => {
  ('Received request to search Event')
    res.sendFile(__dirname + '/public/searchEvent.html');
});




app.post('/delete-event', (req, res) => {
    const eventName = req.body.eventName;

    deleteData(eventName, (err) => {
        if (err) {
            res.status(500).send('Error Deleting Event');
        } else {
            res.send('Successfully Deleted Event');
        }
    });
});

app.post('/form', (req, res) => {
    insertData(req.body, (err) => {
        if (err) {
            res.status(500).send('ERROR');
        } else {
            res.send('Successfully Created Event');
        }
    });
});

app.post('/send-email', async (req, res) => {
    const { recipients, subject, message } = req.body;
    try {
        await notifyAdmin(recipients, subject, message);
        res.send("Email Sent To: " + recipients);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Sending Email.");
    }
});

app.post('/update-event', (req, res) => {
    updateData(req.body, (err) => {
        if (err) {
            res.status(500).send('Error Updating Event');
        } else {
            res.send('Successfully Updated Event');
        }
    });
});


app.post('/search-event', async (req, res) => {
    const eventName = req.body.eventName;

    try {
        const result = await searchEvents(eventName); 
        res.send(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});


// Start server
const port = 1000;
app.listen(port, () => {
    console.log(`Server Running On Port localhost:${port}`);
});
