const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle POST request to send email
app.post('/send-email', (req, res) => {
    const userEmail = req.body.email;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harishbhalaa@gmail.com', // Your Gmail email address
            pass: 'hqcc apld atdt bzzj'  // Your Gmail email password
        }
    });

    // Email options
    const mailOptions = {
        from: 'harishbhalaa@gmail.com',
        to: userEmail,
        subject: 'Voting',
        text: 'The link to put your vote is https://rose-salamander-sock.cyclic.app/'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Failed to send email.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Email sent successfully.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
