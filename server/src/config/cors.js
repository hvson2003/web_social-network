import cors from 'cors';

const corsConfig = cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:3000'],
  credentials: true,
});

export default corsConfig;
