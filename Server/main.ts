import express, { Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";
import { router } from "./Controller/routes";


const app = express();
const port = process.env.PORT;

// Configure CORS
app.use(cors({
  origin: process.env.NEXT_PUBLIC_URL ? [
    'http://localhost:3000', process.env.NEXT_PUBLIC_URL
  ] : ['http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(json());
app.use('/api', router);

// Simple test route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});