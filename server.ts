import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import generalRouter from './routes/generalRoutes';

const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json())

app.use("/api/user", userRoutes);
app.use("/api/session", authRouter);
app.use("/api/general", generalRouter);



app.listen('5000');