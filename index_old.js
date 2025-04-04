// servers/hyper/index.js with HTML form + formidable + audio playback
const HyperExpress = require('hyper-express');
const formidable = require('formidable');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = new HyperExpress.Server({max_body_length:1024 * 1024 * 1000});

const AUTH_SECRET = 'Bearer verysecrettoken';
const AUDIO_DIR = path.join(__dirname, 'audios');
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

// Serve HTML form to upload audio file and test manually
app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html').send(`
    <h2>Upload and Play Audio</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="audio" accept="audio/*" required><br><br>
      <button type="submit">Upload Audio</button>
    </form>
  `);
});

// Upload audio using formidable
app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm({ uploadDir: AUDIO_DIR, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err || !files.audio) return res.status(400).send('Upload failed');
    const uploaded = files.audio[0];
    const name = path.basename(uploaded.originalFilename);
    const finalPath = path.join(AUDIO_DIR, name);
    fs.renameSync(uploaded.filepath, finalPath);
    exec(`ffplay -nodisp -autoexit "${finalPath}"`, err => {
        if (err) {
            console.error('❌ مشکل در پخش:', err);
            res.status(400).send('Play failed');
        }
        else {
            console.log('✅ فایل ویس پخش شد.');
            res.send('done');
        }
      });
    //res.redirect(`/play/${encodeURIComponent(name)}`);
  });
});

// Serve and auto-play uploaded audio file
app.get('/play/:filename', (req, res) => {
  const filename = decodeURIComponent(req.path_parameters.filename);
  const filePath = path.join(AUDIO_DIR, filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('Audio not found');

  res.header('Content-Type', 'text/html').send(`
    <h3>Playing: ${filename}</h3>
    <audio controls autoplay>
      <source src="/audios/${encodeURIComponent(filename)}" type="audio/mpeg">
      Your browser does not support audio playback.
    </audio>
  `);
});

// Serve static audio file
app.get('/audios/:filename', (req, res) => {
  const file = path.join(AUDIO_DIR, req.path_parameters.filename);
  if (!fs.existsSync(file)) return res.status(404).send('Not found');
  res.stream(file);
});

app.listen(3000).then(() => {
  console.log('🎧 Audio server running at http://localhost:3000');
});
