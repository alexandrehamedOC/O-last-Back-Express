import 'dotenv/config';
import { createServer } from 'http';
import app from './app/index.app.js';
import { router } from './app/routers/index.router.js';

const httpServer = createServer(app);

app.use(router);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server launched at http://localhost:${PORT} 🚀`);
});
