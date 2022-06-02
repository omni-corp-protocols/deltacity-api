const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const helmet = require('helmet');
var cors = require('cors');
require('dotenv').config();
const commonRoutes = require('./routes/commonRoutes');
const PORT = process.env.PORT || 8085
const { handleError }  = require('./util/errorHandler');
const morgan = require('morgan');
var multer = require('multer');
var upload = multer();


app.use(morgan('combined'));

// for parsing application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
// app.use(bodyparser.json({ limit: '10000mb', extended: true }));
app.use(cors())

// for parsing multipart/form-data
app.use(upload.single('file')); 
app.use(express.static('public'));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   //  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
//   next();
// });

//securing headers by helmet packkage
app.use(helmet());

app.use('/api', commonRoutes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

// _db.connect(() => {
  app.listen(PORT, () => console.log('Express server is runnig at port no : 8080'));
// });


