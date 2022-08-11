const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 8080
  },
  database: {
    url: 'mongodb+srv://yair1987:vanunu1987@Cluster0-sr49g.mongodb.net/ice-peaks?retryWrites=true',
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInSeconds: 1440
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10
  }
};