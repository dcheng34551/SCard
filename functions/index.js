// optional feature
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.post('/mail', (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: '<your email address>',
            pass: '<your pass word>',
        },
    });

    let mailOptions = {
        from: '<your email>',
        to: data.email,
        subject: `Message from SCard`,
        html: `
        <h3>Test</h3>
        <h3>Message</h3>
        <p>${data.message}</p>
        `,
    };

    smtpTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send('successed!!!');
        }
    });
});

exports.mailAPI = functions.https.onRequest(app);
