export default {
  domains: [
    {
      host: "local.zthunworks.com",
      paths: {
        "/": "zthunworks-services-web:5173",
        "/api": "zthunworks-services-api:3000/api",
      },
    },
  ],
};
