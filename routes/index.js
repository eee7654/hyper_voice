const app = require('../core/app');
const { resolveRoutePath } = require('../utils/route-resolver');

const route = resolveRoutePath(__filename);

console.log(route)

app.get(route, (req, res) => {
    res.header('Content-Type', 'text/html').send(`
        <h2>Upload and Play Audio</h2>
        <form method="POST" action="/upload" enctype="multipart/form-data">
          <input type="file" name="audio" accept="audio/*" required><br><br>
          <button type="submit">Upload Audio</button>
        </form>
    `);
});
