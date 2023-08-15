const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = 'be5deedea28fa9294aeb43356a36f289-ee16bf1a-ff14be6d'; 
const domain = 'sandboxc7df39af0ee24806b6fcc5075412c677.mailgun.org'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
    const email = req.body.email;

    const mailData = {
        from: 'Deepak <deepak4881.be22@chitkara.edu.in>',
        to: email,
        subject: 'suscription for news article ',
        text: 'i am Deepak chahal sending this mail to you to subscribe my news article realated to the performence of indian cricket team  in the upcoming icc world cup 2023 which will held in india from 2 october at ahemdabad. ' ,
    };
    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        } else {
            console.log(body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});
app.listen(8000, () => {
    console.log("The Server is running");
});