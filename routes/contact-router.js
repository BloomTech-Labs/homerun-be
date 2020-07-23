const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  let { email, name, message } = req.body;
  message = message
    .split('\n')
    .map((p) => `<p>${p}</p>`)
    .join('');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_EMAIL_USER, //replace with your email
      pass: process.env.CONTACT_EMAIL_PASS, //replace with your password
    },
  });

  const mailOptions = {
    email, //replace with your email
    to: process.env.CONTACT_EMAIL_USER, //replace with your email
    subject: `Contact name: ${name}`,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log({ mailOptions });
    if (error) {
      console.log(error);
      res.status(404).send('error'); // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully'); //if mail is sent successfully send Sent successfully as response
    }
  });
});

module.exports = router;
