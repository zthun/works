/*
export default {
  domains: [
    {
      host: "pokedexii.local.zthunworks.com",
      paths: {
        "/": "pokedex-services-web:5173",
        "/api": "pokedex-services-api:3000/api",
      },
    },
    {
      host: "database.local.zthunworks.com",
      paths: {
        "/": "pokedex-mongo-express:8081",
      },
    },
  ],
};
*/

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
