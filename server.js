const app = require('./app');
const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, '0.0.0.0', function (port) {
  console.log(`Listening to requests on ${port}`);
});
