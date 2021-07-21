const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = process.env.MONGODBURL;
const DBName = process.env.DBNAME;
let mongodb;
let client;

function connect(callback){
    mongoClient.connect(mongoDbUrl, { useNewUrlParser: true,  useUnifiedTopology: true }, (err, client) => {
        mongodb = client.db(DBName);
        client = client;
        callback();
    });
}
function get(){
    return mongodb;
}

function close(){
    client.close();
}

module.exports = {
    connect,
    get,
    close
};