module.exports = {
  domains: [
    {
      name: 'local.zthunworks.com',
      paths: {
        '/': 'zthunworks-services-web:8080',
        '/api': 'zthunworks-services-api:3000/api',
        '/api/health': 'zthunworks-services-helpful:3000/api/health'
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
