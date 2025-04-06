const app = require('../../../core/app');
const { resolveRoutePath } = require('../../../utils/route-resolver');

const route = resolveRoutePath(__dirname);

app.use(route, async (req, res, next) => {
  console.log(`[🔒 route-middleware] ${req.method} ${req.path}`);
  next();
});
