import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// We get the current folder's path, useful for loading files correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

// Allow frontend from other places to talk to this server
app.use(cors());

// Tell Express to serve static files (your HTML, CSS, JS in 'public' folder)
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer to save uploaded images in 'uploads' folder with unique filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 'uploads' folder to save images
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // Name image files by current time + original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// The main API endpoint where user uploads image and we send prediction
app.post('/predict', upload.single('image'), (req, res) => {
  // Path of the saved image
  const imagePath = req.file.path;

  // Run your python script and pass the image path to it
  const pythonProcess = spawn('python', ['predict.py', imagePath]);

  let prediction = '';

  // Collect output (prediction) from the Python script
  pythonProcess.stdout.on('data', (data) => {
    prediction += data.toString();
  });

  // If any error happens in Python script, log it
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  // When python script finishes
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      // If error happened, send error response
      return res.status(500).json({ error: 'Error processing image' });
    }
    // Send prediction result back to frontend
    res.json({ prediction: prediction.trim() });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
