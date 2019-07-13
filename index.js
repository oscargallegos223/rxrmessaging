const express = require ('express');
const webpush = require ('web-push');
const bodyParser = require ('body-parser');
const path = require ('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'BE_iBLWWIvWiTz76E-C8Fh0LkPYj_GMPZaMzN8SwiDO29KF9wJVSPCzHaefnQy3WZpVbxLwazknd4eg5_HcMYWk';
const privateVapidKey = 'dmBlR0b1-se8ScApdd4g-mqyxw33ovm37M5WYk1ZP-A';

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey, privateVapidKey); 

// Subscribe Route
app.post('/subscribe', (req, res) => {
 // Get pushSubscription object
 const subscription = req.body;

 // Send 201 - resource created
  res.status(201).json({});

  const payload = JSON.stringify({ title: 'RX Reminder' });

  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));