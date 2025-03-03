const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Email configuration

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sivaprasadpittu79@gmail.com', // Replace with your Gmail address
        pass: 'zbze mrip jmvc gmut'  // Replace with your Gmail app password
    }
});
// Route to handle appointment email sending

app.post('/send-appointment-email', (req, res) => {

    const { name, email, date, time, reason, doctor } = req.body;

    if (!name || !email || !date || !time || !reason || !doctor) {

        return res.status(400).send({ message: 'All fields are required.' });

    }

    const mailOptions = {

        from: 'your-email@gmail.com', // Replace with your Gmail address

        to: email,

        subject: 'Appointment Confirmation',

        text: `Dear ${name},\n\nYour appointment has been booked successfully!\n\nDetails:\n- Date: ${date}\n- Time: ${time}\n- Reason: ${reason}\n- Doctor: ${doctor}\n\nThank you for choosing our platform.\n\nBest regards,\nHealth and Wellness Platform

    `};
    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {

            console.error('Error sending email:', error);

            return res.status(500).send({ message: 'Error sending email.' });

        }
        console.log('Email sent:', info.response);

        res.status(200).send({ message: 'Appointment email sent successfully.' });

    });

});

// Start the server

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});