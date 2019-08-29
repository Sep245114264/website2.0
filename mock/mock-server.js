// const Mock = require('mockjs');
const chokidar = require('chokidar');
const path = require('path');
const bodyParser = require('body-parser');

const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app) {
  const { default: mocks } = require('./index');
  // const mocks = require('./index')
  const routeLength = Object.keys(app._router.stack).length;
  mocks.forEach((mock) => {
    const { url, methods, response } = mock;
    app[methods](url, (req, res) => {
      res.json(response(req, res));
    });
  });
  const { length } = Object.keys(mocks);
  return {
    length,
    start: routeLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((item) => {
    if (item.includes(mockDir)) {
      delete require.cache[item];
    }
  });
}

module.exports = (app) => {
  require('@babel/register');
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  let route = registerRoutes(app);
  let routeStart = route.start;
  let routeEnd = route.length + routeStart;
  // app.post(new RegExp('/user/login'), (req, res) => {
  //   // console.log(req, res);
  //   // res.json(Mock.mock(test(req, res)));
  //   res.json(test(req, res));
  // });
  registerRoutes(app);
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event) => {
      const events = ['add', 'change'];
      if (!events.includes(event)) {
        return false;
      }
      try {
        app._router.stack.splice(routeStart, routeEnd);
        unregisterRoutes();
        route = registerRoutes(app);
        routeStart = route.start;
        routeEnd = route.length + routeStart;
        console.log('update success');
      } catch (error) {
        console.log(error);
      }
      return true;
    });
};
