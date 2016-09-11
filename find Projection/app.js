var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course', function(err, db){
    if(err) throw err;

    var query = {'score': 90};
    var projection = {'student': 1 , '_id': 0, 'score':1};  // _id is given randomly. If we don't want to show the item, set to 0, otherwose, set it as 1, defalult is 0

    db.collection('grades').find(query, projection).toArray( function(err, docs){
        if (err) throw err;

        console.dir(docs);

        db.close();
    });
} );
