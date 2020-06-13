require('dotenv').config();
const nodemailer = require('nodemailer');

const credentials = {
  service: 'SendGrid', // no need to set host or port etc.
  auth: {
    user: process.env.SG_USER, // hide
    pass: process.env.SG_PASS, // hide
  },
};

const transporter = nodemailer.createTransport(credentials);

module.exports = async (to, content) => {
  const contacts = {
    from: '"Tidy Hive" <no-reply@tidyhive.life>',
    to,
  };

  const email = Object.assign({}, contacts, content);

  await transporter.sendMail(email);
};
