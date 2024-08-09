import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'O-Last API',
    version:'1.0.0',
    description: 'Welcome on our amazing documentation, anything you need is already here',
  },
  servers: [
    {url: `http://localhost:3000/api/v1` },
  ],
};

const options = {
  swaggerDefinition,
  apis:['./app/routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
