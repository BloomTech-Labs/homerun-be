require("dotenv").config();

module.exports = {
  confirmation: hash => {
    return {
      subject: "Email Confirmation - Tidy Hive",
      text: `Please paste the following link in to your browser's URL bar in order to complete your registration: ${process.env.BASE_URL}/confirm/${hash}`,
      html: `Please follow <a href="${process.env.BASE_URL}/confirm/${hash}">this link</a> to complete your registration.`
    };
  },
  reset: hash => {
    return {
      subject: "Password Reset - Tidy Hive",
      text: `Please paste the following link in to your browser's URL bar in order to reset your password: ${process.env.BASE_URL}/reset/${hash}`,
      html: `Please follow <a href="${process.env.BASE_URL}/reset/${hash}">this link</a> to reset your password.`
    };
  }
};
