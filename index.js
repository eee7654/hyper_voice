const path = require('path')
const app = require('./core/app.js');
const loadRoutes = require('./core/routes-loader.js');

loadRoutes(path.join(__dirname, 'routes'));

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html').send(`
      <h2>Upload and Play Audio</h2>
      <form method="POST" action="/api/v0/voice/upload" enctype="multipart/form-data">
        <input type="file" name="audio" accept="audio/*" required><br><br>
        <button type="submit">Upload Audio</button>
      </form>
  `);
});

app.listen(3000).then(() => {
  console.log('🚀 Server is running at http://localhost:3000');
});