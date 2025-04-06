const fs = require('fs');
const path = require('path');
function loadAllRoutes(dir) {
  const walk = (folder) => {
    // لود میدلویر اول اگه وجود داشت
    const middlewarePath = path.join(folder, '__middleware.js');
    if (fs.existsSync(middlewarePath)) {
      require(middlewarePath);
    }

    fs.readdirSync(folder).forEach((file) => {
      const full = path.join(folder, file);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) return walk(full);
      if (file === '__middleware.js') return; // از قبل لود شده

      if (file.endsWith('.js')) require(full);
    });
  };

  walk(dir);
}

module.exports = loadAllRoutes;