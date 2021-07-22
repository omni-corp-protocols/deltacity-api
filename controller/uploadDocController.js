const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const pinataApiKey = "aad083475e48815a72b6";
const pinataSecretApiKey = "67ff9281afe74add84eaeb0dc7d82112098723952e8147c6679c78c59446e848";
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const ipfsCloudURL = 'https://gateway.pinata.cloud/ipfs'
const JSONToIPFSURL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
const axios = require("axios");
const FormData = require("form-data");

//doc upload api @Vineet
const uploadDoc = async (req, res, next) => {
  try {
    let doc = req.file;
    let form = new FormData();
    form.append('file', doc.buffer, doc.originalname);
    const result = await axios.post(url, form, {
        maxContentLength: "Infinity", 
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
          pinata_api_key: pinataApiKey, 
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
    res.status(200).send({ message: 'file uploaded', error: null, data: result.data });
    } catch (err) {
      next(err);
    }
};

//get doc api @Vineet
const getDoc = async(req, res, next)=>{
//   try{
//     let hash = req.hash;
//     // const result = await axios.get(`${ipfsCloudURL}/QmeZ5KsCmh8RKgPpfGaNd5hzZdwE7xDB51qquKR9b4AHJR`,{
//       // maxContentLength: "Infinity",
//       // headers: {
//       //   // 'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
//       //   // pinata_api_key: pinataApiKey, 
//       //   // pinata_secret_api_key: pinataSecretApiKey,
//       // },
//     });
//     console.log(result);
    res.status(200).send({ message: 'Not working', error: null});
//   }catch(err){
//     console.log(err);
//     next(err);
//   }
}

//upload json object for pinata @Vineet
const uploadObj = async (req, res, next) => {
  try {
    let metaData = {
      "Name": req.body.Name,
      "Creator": req.body.Creator,
      "Content Hash": req.body['Content Hash'],
      "FileExtension": req.body.FileExtension
    };
    const pinataJsonObject = {
      pinataMetadata: {
        name:
        metaData["Name"] + " Metadata by " + metaData['Creator'] + " - " + req.body.SignerAddress,
      },
      pinataContent: metaData,
    };
    let data = JSON.stringify(pinataJsonObject);
    const result = await axios.post(JSONToIPFSURL, data, {
        headers: {
          'Content-Type': "application/json",
          pinata_api_key: pinataApiKey, 
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
    res.status(200).send({ message: 'Data uploaded', error: null, data: result.data });
    } catch (err) {
      next(err);
    }
};


module.exports = {
    uploadDoc,
    getDoc,
    uploadObj
}