require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(routes);
app.use(helmet());
app.use(() => morgan('tiny'));
app.use(() => cors());