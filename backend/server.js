const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3001;


app.use(bodyParser.json());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });
const sns = new AWS.SNS({ apiVersion: '2010-12-01' });

app.post('/send-email', (req, res) => {
  const { to, subject, body } = req.body;

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    },
    Source: 'teeshadembla0509@gmail.com' // This must be an email verified in SES
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error("Error sending email:", err);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent successfully:", data);
      res.status(200).send("Email sent successfully!");
    }
  });
});

// Endpoint for sending SMS
app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional' // Or 'Promotional'
      }
    }
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.error("Error sending SMS:", err);
      res.status(500).send("Error sending SMS.");
    } else {
      console.log("SMS sent successfully:", data);
      res.status(200).send("SMS sent successfully!");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});