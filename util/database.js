const config = require('config');
var mongoConnectUrl = config.get('mongoConnectUrl');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(mongoConnectUrl)
    .then(client => {
      console.log("Connected!");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;