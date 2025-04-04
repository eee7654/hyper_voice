const app = require('../../../core/app');
const { resolveRoutePath } = require('../../../utils/route-resolver');
const formidable = require('formidable');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const AUDIO_DIR = path.join(process.cwd(), 'audios');
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

const route = resolveRoutePath(__filename);

console.log(route)

app.post(route, (req, res) => {
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
    });
  });
