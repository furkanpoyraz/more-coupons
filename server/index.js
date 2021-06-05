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
app.use(express.json());
app.use(express.urlencoded());

const mongoConf = {
    url: "mongodb://root:rootpassword@localhost:27017",
    db: 'more-coupons',
    settings: { useNewUrlParser: true, useUnifiedTopology: true }
}

const findCoupons = function(db, callback) {
    // Get the coupons collection
    const collection = db.collection('coupons');
    // Find some coupons
    collection.find({}).toArray(function(err, docs) {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

const insertCoupon = function(db, item, callback) {
    // Get the coupons collection
    const collection = db.collection('coupons');
    // Insert some coupons
    collection.insertOne(item, function(err, result) {
        assert.equal(err, null);
        console.log('Inserted 1 coupon into the collection');
        callback(result);
    });
};

mongoClient.connect(mongoConf.url, mongoConf.settings, function(err, client) {
    if (err) throw err;

    const db = client.db(mongoConf.db);
    console.log("Connected to database!");

    app.get('/coupons', function (req, res) {
        findCoupons(db, function(docs) {
            res.send(docs);
        });
    });

    app.post('/coupons', function (req, res) {
        const item = req.body;
        insertCoupon(db, item, function(docs) {
            res.send(docs);
        });
    });
});


app.listen(3001);