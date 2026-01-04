export default {
  servers: [
    {
      type: "http",
      handle: "redirect",
    },
    {
      type: "https",
      security: {
        domain: "local.zthunworks.com",
      },
      domains: {
        "local.zthunworks.com": {
          "/": "http://zthunworks-services-web:5173",
          "/api": "http://zthunworks-services-api:3000",
        },
      },
    },
  ],
};
