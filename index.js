import 'dotenv/config';
import { createServer } from 'http';
import app from './app/index.app.js';
import router from './app/routers/index.router.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';


const httpServer = createServer(app);

app.use(router);

app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server launched at http://localhost:${PORT} 🚀`);
});
