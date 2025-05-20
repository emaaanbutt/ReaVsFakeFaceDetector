import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

// Allow cross-origin requests
app.use(cors());

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));

// Use memory storage (no saving files to disk)
const upload = multer({ storage: multer.memoryStorage() });

app.post('/predict', upload.single('image'), (req, res) => {
  const pythonProcess = spawn('python', ['predict.py']);

  let prediction = '';

  // Send image buffer to Python script via stdin
  pythonProcess.stdin.write(req.file.buffer);
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
    prediction += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Error processing image' });
    }
    res.json({ prediction: prediction.trim() });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
