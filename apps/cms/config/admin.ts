export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'defaultSecretChangeInProduction'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'defaultSaltChangeInProduction'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'defaultTransferSaltChangeInProduction'),
    },
  },
  url: env('ADMIN_URL', 'http://localhost:1337/admin'),
  autoOpen: false,
});

