module.exports = {
  domains: [
    {
      name: 'local.zthunworks.com',
      paths: {
        '/': 'zthunworks-services-web:5173',
        '/api': 'zthunworks-services-api:3000/api'
      }
    },
    {
      name: 'database.local.zthunworks.com',
      paths: {
        '/': 'zthunworks-services-database:8081'
      }
    },
    {
      name: 'email.local.zthunworks.com',
      paths: {
        '/': 'zthunworks-services-email'
      }
    }
  ]
};
