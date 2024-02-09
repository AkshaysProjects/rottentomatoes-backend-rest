import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    exitOnErrors: true,
    exitOnFileNotFound: true,
    openapi: "3.0.0",
    info: {
      title: "RottenTomatoes REST API",
      version: "1.0.0",
      description:
        "The RottenTomatoes REST API provides developers with access to detailed information on movies, TV shows, and shortlist features. With secure authentication via API key, the API delivers JSON-formatted data for easy integration. Ideal for applications requiring up-to-date entertainment content, the API includes endpoints for retrieving movie and TV show details, ratings, reviews, and managing user shortlists.",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Development server",
      },
      {
        url: "https://rottentomatoes-rest.akshaykakatkar.tech/",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
