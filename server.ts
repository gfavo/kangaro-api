import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json())

app.use("/api/user", userRoutes);

app.listen('5000');