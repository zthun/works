module.exports = {
  domains: [
    {
      name: 'local.zthunworks.com',
      paths: {
        '/': `zthunworks-services-web:8080`,
        '/api': `zthunworks-services-api:3000/api`
      }
    }
  ]
};
