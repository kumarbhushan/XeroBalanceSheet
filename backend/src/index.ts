import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import { XERO_API_URL, PORT } from './config/app.config';
import corsOptions from './config/cors.config';


// Load environment variables
dotenv.config();

const app = express();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Middlewares
app.use(cors(corsOptions));
app.use(helmet()); // Security headers
app.use(compression()); // GZIP compression
app.use(express.json()); // Parse incoming JSON requests

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Balance sheet route
app.get('/balance-sheet', async (req, res) => {
    try {
        const response = await axios.get(XERO_API_URL);
        res.json(response.data);
    } catch (error) {
        let errorMessage = "Something went wrong";
        let errorStack = "@index.js:41:10";
        if (error instanceof Error) {
            errorMessage = error.message;
            errorStack = error.stack || '';
        }
        logger.error(`Error fetching balance sheet: ${errorMessage}`, {
            stack: errorStack,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: 'Error in fetching balance sheet data' });
    }
});

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});

export default app;
