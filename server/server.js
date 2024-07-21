const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// async function forwardEmail(originalEmail: {
//   from: string;
//   subject: string;
//   text?: string;
//   html?: string;
// }, forwardTo: string): Promise<void> {
//   const mailOptions = {
//     from: originalEmail.from,
//     to: forwardTo,
//     subject: `Fwd: ${originalEmail.subject}`,
//     text: originalEmail.text || '',
//     html: originalEmail.html || '',
//   };

// // Configure the SMTP transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com', // Replace with your SMTP server host
//   port: 587, // Replace with your SMTP server port
//   secure: false, // Use true for port 465, false for other ports
//   auth: {
//     user: 'your-email@example.com', // Replace with your email address
//     pass: 'your-email-password', // Replace with your email password or app-specific password
//   },
// });

// /**
//  * Function to forward an email.
//  *
//  * @param originalEmail The original email details
//  * @param forwardTo The recipient to forward the email to
//  */
// async function forwardEmail(originalEmail: {
//   from: string;
//   subject: string;
//   text?: string;
//   html?: string;
// }, forwardTo: string): Promise<void> {
//   const mailOptions = {
//     from: originalEmail.from,
//     to: forwardTo,
//     subject: `Fwd: ${originalEmail.subject}`,
//     text: originalEmail.text || '',
//     html: originalEmail.html || '',
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email forwarded successfully');
//   } catch (error) {
//     console.error('Error forwarding email:', error);
//   }
// }

// // Example usage
// const originalEmail = {
//   from: 'sender@example.com',
//   subject: 'Hello World',
//   text: 'This is the email body.',
// };

// const forwardTo = 'recipient@example.com';

// forwardEmail(originalEmail, forwardTo);
