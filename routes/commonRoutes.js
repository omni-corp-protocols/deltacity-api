const express = require('express');
const commonRouter = express.Router();
const { validateToken } = require('../controller/authController');
const { login } = require('../controller/commonController');
const { uploadDoc, getDoc, uploadObj} = require('../controller/uploadDocController');



//user open routes
commonRouter.post('/login', login);

//data upload routes
commonRouter.post('/nftdoc', uploadDoc);
commonRouter.get('/nftdoc', getDoc);

//upload json file to pinata
commonRouter.post('/jsonObj', uploadObj);


module.exports = commonRouter;