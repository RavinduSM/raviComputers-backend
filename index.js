import express from 'express';
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser'

import authRouter from './routers/auth.routes.js';
import categoryRouter from './routers/category.routes.js';
import productRouter from './routers/product.routes.js';
import uploadRouter from './routers/upload.routes.js'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/upload', uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});

