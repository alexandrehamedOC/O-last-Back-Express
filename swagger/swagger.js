import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapo: '3.0.0',
    info: {
        title: 'O-Last API',
        version:'1.0.0',
        description: 'Welcome on our amazing documentation, anything you need is already here'
    },
};

const options = {
    swaggerDefinition,
    apis:['./app/routers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;