const { OAuth2Client } = require('google-auth-library');

module.exports = function googleAuth(req, res, next) {
  const tokenID = req.body.tokenID;

  const client = new OAuth2Client(process.env.G_CLIENT_ID);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: tokenID,
      audience: process.env.G_CLIENT_ID,
    });

    return ticket.getPayload();
  }
  verify()
    .then((payload) => {
      res.googleInfo = payload;
      next();
    })
    .catch(console.error);
};
