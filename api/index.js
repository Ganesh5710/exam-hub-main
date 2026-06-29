import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname equivalence for ESM environment configuration 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable secure cross-origin resource sharing for your portal setup
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

// --- Core API Architecture Endpoints ---
app.get('/api/health', (req, res) => {
  res.json({ 
    status: "online", 
    framework: "Express serverless context",
    realtime: "Delegated securely to Supabase Broadcast Channels"
  });
});

// Serve frontend build output when running in a standalone monolithic environment
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback path router handler to preserve clean client-side routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Local dev fallback server launcher. 
// Vercel completely bypasses this block and runs the exported app directly.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Communication backend running locally on port ${PORT}`);
  });
}

// Export the express instance as the default handler for Vercel
export default app;