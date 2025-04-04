const path = require('path');

function resolveRoutePath(filePath, baseDir = path.join(__dirname, '..', 'routes')) {
  let relative = filePath.replace(baseDir, '').replace(/\\/g, '/');

  // Remove .js extension
  relative = relative.replace(/\.js$/, '');

  // Remove /index at the end (like Next.js)
  relative = relative.replace(/\/index$/, '');

  // Convert [param] → :param
  relative = relative.replace(/\[([^\]]+)\]/g, ':$1');

  // Convert [...param] → *param
  relative = relative.replace(/:\.\.\.(\w+)/g, '*$1');

  // Add API prefix if needed
  if (!relative.startsWith('/')) relative = '/' + relative;
  if (!relative.startsWith('/api')) relative = '/api' + relative;

  return relative;
}

module.exports = { resolveRoutePath };
