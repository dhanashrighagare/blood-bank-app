const nodemailer = require("nodemailer");

// Define sendMail function
const sendMail = async (req, res) => {
    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or any other service you use
            auth: {
                user: 'dhanashrighagare12@gmail.com',
                pass: process.env.EMAIL_PASSWORD // Use environment variables for sensitive data
            }
        });

        // Define mail options
        const mailOptions = {
            from: 'dhanashrighagare12@gmail.com',
            to: 'dhanashrighagare1220@gmail.com',
            subject: 'Testing',
            text: 'Done'
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
};

module.exports = sendMail;
