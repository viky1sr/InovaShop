import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import color from 'colors';
import prodctRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './app/Middleware/ErrorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use('/api/v1/products', prodctRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow));

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close Server and Exite
    server.close(() => process.exit(1));
})


