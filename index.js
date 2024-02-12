import express from 'express';
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routers/auth.routes.js';
import categoryRouter from './routers/category.routes.js'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});