 // loop for creating the score
 for (i = 0; i<1000; i++) {names = ["exam", "essay", "quiz"]; for (j=0; j<3; j++) {db.scores.insert({"student":i, "type":names[j], score: Math.round(Math.random()*100)});}}

//  $gt: greater than 95, $ltless than 98;  $gte: greater than inclusive, $lte: less than inclusive.. They can also compare letters
db.scores.find({score:{$gt: 95, $lt:98}, type: "essay"})

//  $existe, $type: 2 (strings)
db.scores.find({score:{$exists: true}, type: "essay"})

// $regexes: pattern match (regular expression)
db.users.find({name:{$regex: "^A"}, email: {$exists: true}})

// $or, $and
db.people.find({ $or: [ {name : {$regex: "e$"}}, {age : {$exists: true} } ] } )
db.scores.find( { $or: [{ score: {$lt:50}}, {score: {$gt: 90} } ] } )
db.people.find({ $and [ {name : {$regex: "e$"}}, {age : {$exists: true} } ] } )

// if the $or/ $and is missing, the command will match the last command
db.scores.find( { { score: {$lt:50}}, {score: {$gt: 90} } } ) // mathch $gt:90

// inside arrays
db.accounts.find( {favorite : 'pretzels'} )   // will show the records which includes 'pretzels'

// $in, $all
db.accounts.find( {favorite : { $all : [ "pretzels", "beer" ] } } )
db.accounts.find( {favorite : { $in : [ "pretzels", "beer" ] } } )  // contains "pretzels" or "beer"

// Dot Notation
db.users.find(  {email: { work: "richard@10gen.com" ,  personal: " cuzl@example.com" }  } )
db.users.find( { "email.work": "richard@10gen.com" } )

// Querying, Cursors
cur = db.people.find(); null; // returns null
cur.hasNext( )  // returns  "true"
cur.next( )

while (cur.hasNext( )) printjson( cur.next() )

cur.limit(5); null
while (cur.hasNext( )) printjson( cur.next() )  // then, only 5 records printed

cur.sort( {name : -1} ); null
while (cur.hasNext( )) printjson( cur.next() )   // print in order by name

cur.sort( {name : -1} ).limit(3); null
while (cur.hasNext( )) printjson( cur.next() )

cur.sort( {name : -1} ).limit(3).skip(2); null
while (cur.hasNext( )) printjson( cur.next() ) // skip the first 2

// counting results
db.scores.count({type : 'exam'})

// update documents in the dastabase  .update,   $set
db.people.update(  {  'before' }, { 'after' } )
db.people.update( { name : "Smith" },  {name: "Thompson", salary : 50000 } )  // the whole record will change, lose information
db.people.update( {name: "Alice"},  {  $set  :  {age : 31}  } )
db.people.update( {name: "Alice"},  {  $inc :  {age : 1}  } )  // increase age by 1

// $unset: remove some specific filed
db.people.update(  { name: "John" }, {$unset: {profession : 1}} )

// $push, $pop, $pull, $pushAll, $pullAll, $addToSet
db.arrays.insert({_id: 0, a: [1,2,3,4]})
db.arrays.update( {_id: 0}, {$set: { 'a.2': 5}} )  // 3 ---> 5
db.arrays.update(   {_id: 0}, {$push: { a: 6}} )  // add 6 at the end of a
db.arrays.update(   {_id: 0}, {$pop: { a: 1}} )    // remove the last one of a
db.arrays.update(   {_id: 0}, {$push: { a: -1}} )  // remove the first one of a
db.arrays.update(   {_id: 0}, {$pushAll: { a: [7,8,9]}} ) // add all of them at the end of a
db.arrays.update(   {_id: 0}, {$pull: { a: 5}} )  // remove 5 from a
db.arrays.update(   {_id: 0}, {$pullAll: { a: [7,8,9]}} )  // remove 7,8,9 from a

// Upsert  which can add some new documents , if the information is not enough in update, it will create a new record
db.people.update(  {name: "George"}, {$seet: { age: 40 }}, {upser: true} )

// multi-update: update multiple documents
db.people.update( {}, {$set; {title: "Dr"}}    )  // only update the first document it found
db.people.update( {}, {$set; {title: "Dr"}} , {multi: true}   )

// remove data
db.people.remove( {name: "Alice"} )
db.people.remove( )   // all will be removed
db.people.drop()  // applied for large one

// getLastError
db.runCommand( {getLastError : 1}  )

//























































