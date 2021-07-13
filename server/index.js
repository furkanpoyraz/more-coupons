const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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
app.use(express.urlencoded({ extended: true }));

const mongoConf = {
  url: "mongodb://localhost:27017",
  db: 'more-coupons',
  settings: { useNewUrlParser: true, useUnifiedTopology: true }
}

const findCoupons = function(db, query, callback) {
  // Get the coupons collection
  const collection = db.collection('coupons');
  // Find some coupons
  collection.find(query).toArray(function(err, docs) {
    assert.strictEqual(err, null);
    callback(docs);
  });
};

const insertCoupon = function(db, item, callback) {
  // Get the coupons collection
  const collection = db.collection('coupons');
  // Insert some coupons
  collection.insertOne(item, function(err, result) {
    console.log('Inserted 1 coupon into the collection');
    callback(result);
  });
};

const removeCoupon = function(db, query, callback) {
  // Get the coupons collection
  const collection = db.collection('coupons');
  // Delete coupon matching query
  collection.deleteOne(query, function(err, result) {
    console.log('Removed the matching document');
    callback(result);
  });
};

mongoClient.connect(mongoConf.url, mongoConf.settings, function(err, client) {
  if (err) throw err;

  const db = client.db(mongoConf.db);
  console.log("Connected to database!");

  app.get('/coupons', function (req, res) {
    findCoupons(db, {}, function(docs) {
      res.send(docs);
    });
  });

  app.get('/coupons/:code', function (req, res) {
    const code = req.params.code;
    findCoupons(db, {code: code}, function(docs) {
      res.send(docs);
    });
  });

  app.post('/coupons', function (req, res) {
    const coupon = req.body;
    insertCoupon(db, coupon, function(docs) {
      res.send(docs);
    });
  });

  app.delete('/coupons/:id', function (req, res) {
    const id = new ObjectID(req.params.id);
    removeCoupon(db, {_id: id}, function(docs) {
      res.send(docs);
    });
  });
});


app.listen(3001);
