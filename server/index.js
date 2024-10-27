import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import setupRoutes from './src/routes/routes.js';
import corsConfig from './src/config/cors.js';
import upload from './src/config/multer.js';
import { uploadFile } from './src/controllers/UploadController.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Config middleware
app.use(corsConfig);
app.use(cookieParser());
app.use(express.json());

// Setup Routes
setupRoutes(app);
app.post('/api/upload', upload.single('file'), uploadFile);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
