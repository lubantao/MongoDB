// update - replacement
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course', function(err, db){
    if(err)  throw err;

    var query = {'assignment': 'hw1'};

    db.collection("grades").findOne(query, function(err,doc){
        if(err)  throw err;
        if(!doc) {
            console.log('No documents for assignment '+ query.assignment + ' found!');
            return db.close();
        }

        query['_id'] = doc['_id' ];
        doc['date_returned'] = new Date();

        db.collection('grades').update(query, doc, function(err, updated){
            if(err)  throw err;

            console.dir("Successfully updated "+ updated + " document!");

            return db.close();
        });
    });

});

// use $set  - update in place
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course', function(err, db){
    if(err)  throw err;

    var query = {'assignment': 'hw1'};
    var operator = {'$set': {'date_returned': new Date()}};

    db.collection("grades").findOne(query, operator, function(err, updated){
        if(err)  throw err;
        query['_id'] = doc['_id' ];
        doc['date_returned'] = new Date();

        db.collection('grades').update(query, doc, function(err, updated){
            if(err)  throw err;

            console.dir("Successfully updated "+ updated + " document!");

            return db.close();
    });

});

// mltiple
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course', function(err, db){
    if(err)  throw err;

    var query = { };
    var operator = {'$unset': {'date_returned' : ' '}};
    var options = {'multi': true};

    db.collection("grades").update.(query, operator, options, function(err, updated){
        if(err)  throw err;

        console.dir("Successfully updated "+ updated + " documents!");

        return db.close();
    });

});
