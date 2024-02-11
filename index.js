import express from 'express';
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

const app = express();

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
});