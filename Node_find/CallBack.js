var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db){
    if(err) throw err;

    var query = {'score': 90};

    function callback(err, doc){
        if(err) throw err;

        console.dir(doc);

        db.close();
    }

    db.collection('grades').findOne(query, callback);

});
