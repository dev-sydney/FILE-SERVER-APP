const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const errorController = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const fileRouter = require('./routes/fileRoutes');
const clientRouter = require('./routes/clientsRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.enable('trust proxy');

app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/clients', clientRouter);

app.use(errorController);

app.listen(port, function () {
  console.log(`Listening to requests on ${port}`);
});
