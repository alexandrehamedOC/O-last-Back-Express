import express from 'express';
import router from './routers/index.router.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.middleware.js';

const app = express();

// Configuration de CORS pour autoriser les requêtes de localhost:5173
const corsOptions = {
  origin: ['http://localhost:5173', 'https://o-last.onrender.com'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);

app.use(errorHandler);

export default app;
