const port = process.env.PORT || 3000;
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const authConfig = {
  domain: 'xckon.auth0.com',
  audience: 'https://xckon.auth0.com/api/v2/' ,
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
});

app.get('/api/check', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!'
  });
});

// Start the app
app.listen(port, () => console.log(`API listening on ${port}`));