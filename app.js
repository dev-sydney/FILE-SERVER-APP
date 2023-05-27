const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorController = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const fileRouter = require('./routes/fileRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/files', fileRouter);

app.use(errorController);

module.exports = app;
