require("dotenv").config();

module.exports = {
  confirmation: hash => {
    return {
      subject: "Email Confirmation - Tidy Hive",
      text: `Please paste the following link in to your browser's URL bar in order to complete your registration: ${process.env.FE_URL}/confirm-account/${hash}`,
      html: `Please follow <a href="${process.env.FE_URL}/confirm-account/${hash}">this link</a> to complete your registration.`
    };
  },
  reset: hash => {
    return {
      subject: "Password Reset - Tidy Hive",
      text: `Please paste the following link in to your browser's URL bar in order to reset your password: ${process.env.FE_URL}/reset-password/${hash}`,
      html: `Please follow <a href="${process.env.FE_URL}/reset-password/${hash}">this link</a> to reset your password.`
    };
  },
  householdInvite: (hash, householdId) => {
    return {
      subject: "Household Invite - Tidy Hive",
      text: `Please paste the following link in to your browser's URL bar in order to join this household: ${process.env.FE_URL}/invite/${hash}/${householdId}`,
      html: `Please follow <a href="${process.env.FE_URL}/invite/${hash}/${householdId}">this link</a> to join this household.`
    };
  }
};
