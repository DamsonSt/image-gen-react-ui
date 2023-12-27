const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/generateImage', (req, res) => {
  // Replace this with your actual image generation code
  // This is just a placeholder for demonstration purposes
  const previewImage = generateImage(req.body);
  res.json({ previewImage });
});

function generateImage(params) {
  // Replace this with your actual image generation code
  // This is just a placeholder for demonstration purposes
  const resolution = parseInt(params.resolution.split('x')[0]);
  const previewImage = Array.from({ length: resolution }, () =>
    Array.from({ length: resolution }, () => [Math.random() * 255, Math.random() * 255, Math.random() * 255])
  );
  return previewImage;
}

app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
});
