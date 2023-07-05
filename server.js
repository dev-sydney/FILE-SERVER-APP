const app = require('./app');
const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, function () {
  console.log(`Listening to requests on ${port}`);
});
