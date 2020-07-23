require('dotenv').config();

module.exports = {
  confirmation: (pin) => {
    return {
      subject: 'Email Confirmation - Tidy Hive',
      text: `Enter the following PIN on the signup page to confirm this email address: ${pin}`,
      html: `Enter the following PIN on the signup page to confirm this email address:<br/><p style="font-weight: 700; font-size: 1.5em;">${pin}</p>`,
    };
  },
  reset: (hash) => {
    return {
      subject: 'Password Reset - Tidy Hive',
      text: `Please paste the following link in to your browser's URL bar in order to reset your password: ${process.env.FE_URL}/reset-password/${hash}`,
      html: `Please follow <a href="${process.env.FE_URL}/reset-password/${hash}">this link</a> to reset your password.`,
    };
  },
  householdInvite: (hash, householdId) => {
    return {
      subject: 'Household Invite - Tidy Hive',
      text: `Please paste the following link in to your browser's URL bar in order to join this household: ${process.env.FE_URL}/invite/${hash}/${householdId}`,
      html: `Please follow <a href="${process.env.FE_URL}/invite/${hash}/${householdId}">this link</a> to join this household.`,
    };
  },
};
