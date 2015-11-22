//Patryk Piecha, Playgrounds and Beaches in County Galway API

//  All the things we need for the app to work
//================================================================
var express     = require('express');
var sqlite3     = require('sqlite3').verbose();
var bodyparser  = require('body-parser');
var prompt      = require('prompt');    
var fs          = require('fs');
var app         = express();
app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: true }));
//================================================================

//  Reading JSON files
//==============================================================================
var playgrounds = JSON.parse(fs.readFileSync('playgroundsGalway.json','utf8'));
var beaches = JSON.parse(fs.readFileSync('BeachesCountyGalway.json','utf8'));
//==============================================================================


//  Creating the databases
//====================================================================================================================================
var db = new sqlite3.Database(':memory:');
db.serialize(function() {
    
//  Creating first database (playgrounds)
//====================================================================================================================================
  db.run('CREATE TABLE playgrounds (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT, area TEXT, managed TEXT, playground TEXT, age TEXT, eq TEXT, eq_ire TEXT, kids_eq TEXT, toilet TEXT, hours TEXT, parking TEXT)');
  var stmt = db.prepare('INSERT INTO playgrounds (location,area,managed,playground,age,eq,eq_ire,kids_eq,toilet,hours,parking) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
  for (var i = 0; i < playgrounds.length; i++) {
      //console.log(playgrounds);
      stmt.run(playgrounds[i].LOCATION
               , playgrounds[i].AREA
               , playgrounds[i].MANAGED
               , playgrounds[i].PLAYGROUND
               , playgrounds[i].AGE
               , playgrounds[i].EQ
               , playgrounds[i].EQ_IRE
               , playgrounds[i].KIDS_EQ
               , playgrounds[i].TOILET
               , playgrounds[i].HOURS
               , playgrounds[i].PARKING
              );
  }
  stmt.finalize();
    
//  Creating second database (beaches)
//===================================================================================================================================
 db.run('CREATE TABLE beaches (id INTEGER PRIMARY KEY AUTOINCREMENT, beach TEXT, area TEXT, hours TEXT, guards TEXT, flag TEXT)');
  var stmt = db.prepare('INSERT INTO beaches (beach,area,hours,guards,flag) VALUES (?,?,?,?,?)');
  for (var i = 0; i < beaches.length; i++) {
      stmt.run(beaches[i].Beach
               , beaches[i].Area
               , beaches[i].OpeningHours
               , beaches[i].NumOfLifeGuards
               , beaches[i].Blueflag
              );
  }
  stmt.finalize();
});
//=====================================================================================================================================


//  Using browser to check database files, also enables to delete playground or beach
//=====================================================================================================================================================================================
app.get('/allplaygrounds', function(req,res) { // this function displays all playgrounds in the database
    db.all("Select * FROM playgrounds", function(err,row) {
        rowData = JSON.stringify(row, null, '\t');
        res.sendStatus(rowData);
    });   
});


app.get('/allbeaches', function(req,res) { // this function displays all beaches
    db.all("Select * FROM beaches", function(err,row) {
        rowData = JSON.stringify(row, null, '\t');
        res.sendStatus(rowData);
    });   
});

app.get('/area/:area', function (req, res) { //two quaries in one using UNION, this is done so that I can display beaches and playgrounds within specific area, I have added one column to specify if data is coming for beach or playground
    db.all("SELECT 'Playground' as attraction, playground as name, area, hours FROM playgrounds WHERE area LIKE '%" + req.params.area + "%' UNION SELECT 'Beach' as attraction, beach as name, area, hours from beaches where area LIKE '%" + req.params.area + "%'", function(err, row) {
        if (err || row.length == 0) {
            res.send('Error 404: No Attractions in this area found');
        } else {
            rowData = JSON.stringify(row, null, '\t');
            res.sendStatus(rowData);
        }
    });
});

app.get('/deleteplayground/:area', function(req, res){ // this function enables to delete playground in certain area
    db.serialize(function(){
        //check if any records exist within this area
        db.all('SELECT location FROM playgrounds WHERE area LIKE "' + req.params.area + '"', function(err, row) {
            //if no records in db or error then show error message
            if (err || row.length == 0) {
                res.send('Error: ' + req.params.area + ' area doesnt exist')
            } else {
                //record is in db, delete it              
                //record that has been deleted and show in console
                rowData = JSON.stringify(row, null, '\t');
                console.log("deleted: " + rowData);
                
                db.run('DELETE FROM playgrounds WHERE area LIKE "%' + req.params.area + '%"',  function(err){
                    console.log(req.params.area + " playgrounds deleted");
                    res.sendStatus("Success: Playgrounds in " + req.params.area + " area got deleted");
                });
            }
        });
    });
});

app.get('/deletebeach/:area', function(req, res){ // this function enables to delete beaches in certain area
    db.serialize(function(){
        //check if any records exist within this area
        db.all('SELECT area FROM beaches WHERE area LIKE "' + req.params.area + '"', function(err, row) {
            //if no records in db or error then show error message
            if (err || row.length == 0) {
                res.send('Error: ' + req.params.area + ' area doesnt exist')
            } else {
                //record is in db, delete it             
                //record what has been deleted and show in console
                rowData = JSON.stringify(row, null, '\t');
                console.log("deleted: " + rowData);
                
                db.run('DELETE FROM beaches WHERE area LIKE "%' + req.params.area + '%"',  function(err){
                    console.log(req.params.area + " beaches deleted");
                    res.sendStatus("Success: Beaches in " + req.params.area + " area got deleted");
                });
            }
        });
    });
});
//=====================================================================================================================================================================================


// Designing the schemas for Beach and Playground that I am going to use in order to add to database
//=====================================================================================================================================================================================
var schemaBeach = {
  properties: {
    beach: {
        message: 'Name of the beach your are trying to add',
        required: true
    },
    area: {
        message: 'Where the beach is located(Town/City)',              
        required: true
    },
    hours: {
        message: 'Opening hours'            
    },
    guards: {
        message: 'Number of guards at the beach'            
    },
    flags: {
        message: 'Are there blue flags on this beach? (Yes/No)'            
    }
  }
};

var schemaPlayground = {
  properties: {
    location: {
        message: 'Location of the playground',
        required: true
    },
    area: {
        message: 'Where the playground is located(Town/City)',              
        required: true
    },
    managed: {
        message: 'By whom is this playground managed by'            
    },
    playground: {
        message: 'What is this playground called'            
    },
    age: {
        message: 'Playgrounds suitable age group'            
    },
    eq: {
        message: 'List of equipment'            
    },
    eq_ire: {
        message: 'List of equipment in Irish'            
    },
    kids_eq: {
        message: 'Any kids equipment?(Yes/No) If yes, please specify'            
    },
    toilet: {
        message: 'Are there toilets in this playground'            
    },
    hours: {
        message: 'Opening hours'            
    },
    parking: {
        message: 'Is there parking in this playground'            
    }
  }
};
//=====================================================================================================================================================================================

// Editing the database using command prompt. Enables to add Beach and Playground as well as check which area contains Beach and playground.
//=====================================================================================================================================================================================
prompt.start();
menu();

function menu(){
  console.log("If you would like to check which Areas contain Beaches and Playgrounds please press 1. To add new Beach, please press 2. To add new Playground, please press 3.");
  prompt.get(['answer'], function(err, result){ //  Starts up the prompt and waits for an input
    if (result.answer == 1){
      checkAreaWithPlaygroundsAndBeaches(); // If answer is 1, display area that contains playgrounds and beaches together.
    }
      else if(result.answer == 2){
      newBeach();      //  If answer is 2, add new beach function.
    }
    else if(result.answer == 3){
      newPlayground();      //  If answer is 3, add new playground function.
    }
  });
}

function checkAreaWithPlaygroundsAndBeaches(){
    db.serialize(function() {
        db.each("SELECT playgrounds.*, beaches.* FROM playgrounds INNER JOIN beaches ON playgrounds.area = beaches.area ORDER BY beaches.area ASC", function(err, row) {
        console.log("In area " + row.area + " you will find " + row.beach + " beach, and " + row.playground + " playground."); 
            // last record is Loughrea Lake in ASC order therefore displaying Menu after that record. Otherwise it displays menu BEFORE the console.log, no idea why.
        if (row.beach == "Loughrea Lake"){
            menu();
        }
        });
    });
}

function newBeach(){ // Adding new beach function, using the schema I designed.
prompt.get(schemaBeach, function (err, result) { 
  if (err) {
        console.log(err);
        return 1;
  }
    
  console.log('Command-line input received:');
  console.log('  beach: ' + result.beach);
  console.log('  area: ' + result.area);
  console.log('  hours: ' + result.hours);
  console.log('  guards: ' + result.guards);
  console.log('  flags: ' + result.flags);
    
  db.all("INSERT INTO beaches (beach, area, hours, guards, flag) VALUES ('" + result.beach + "', '" + result.area + "', '" + result.hours + "', '" + result.guards + "', '" + result.flags + "')", function(err, row) {
      if (err) {
          console.log(err);
      } else {
          console.log("New Beach added");
      }
      menu();
    });
 });
}

function newPlayground(){ // Adding new playground function, using the schema I designed.
prompt.get(schemaPlayground, function (err, result) {
  //
  // Log the results.
  //
    
  if (err) {
        console.log(err);
        return 1;
  }
  console.log('Command-line input received:');
  console.log('  location: ' + result.location);
  console.log('  area: ' + result.area);
  console.log('  managed: ' + result.managed);
  console.log('  playground: ' + result.playground);
  console.log('  age: ' + result.age);
  console.log('  eq: ' + result.eq);   
  console.log('  eq_ire: ' + result.eq_ire);
  console.log('  kids_eq: ' + result.kids_eq);
  console.log('  toilet: ' + result.toilet);
  console.log('  hours: ' + result.hours);
  console.log('  parking: ' + result.parking);
    
    
  db.all("INSERT INTO playgrounds (location,area,managed,playground,age,eq,eq_ire,kids_eq,toilet,hours,parking) VALUES ('" + result.location + "', '" + result.area + "', '" + result.managed + "', '" + result.playground + "', '" + result.age + "', '" + result.eq + "', '" + result.eq_ire + "', '" + result.kids_eq + "', '" + result.toilet + "', '" + result.hours + "', '" + result.parking + "')", function(err, row) {
      if (err) {
          console.log(err);
      } else {
          console.log("New Playground added");
      }
      menu();
    });
 });
}
//=====================================================================================================================================================================================

app.listen(8000);
