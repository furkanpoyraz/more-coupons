const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,x-http-method-override,content-type,accept');
  
    next();
});

const mongoConf = {
    url: "mongodb://root:rootpassword@localhost:27017",
    db: 'more-coupons',
    settings: { useNewUrlParser: true, useUnifiedTopology: true }
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('coupons');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

mongoClient.connect(mongoConf.url, mongoConf.settings, function(err, client) {
    if (err) throw err;
    console.log("Connected to database!");

    app.get('/coupons', function (req, res) {

        const db = client.db(mongoConf.db);

        findDocuments(db, function(docs) {
            res.send(docs);
        });

    });
});


app.listen(3001);