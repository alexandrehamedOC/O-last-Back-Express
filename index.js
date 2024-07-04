import 'dotenv/config';
import { createServer } from 'http';
import app from './app/index.app.js';
import cors from 'cors';
import router from './app/routers/index.router.js';

const httpServer = createServer(app);

// Configuration de CORS pour autoriser les requêtes de localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.use(router);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server launched at http://localhost:${PORT} 🚀`);
});
