var express = require('express');
var app = express();

//const dbConfig = require("./db.config.js");
var mysql = require('mysql');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConn = mysql.createConnection({
    host: "ucka.veleri.hr",
    port: 3306,
    user: "fmaksimovic",
    password: "11",
    database: "fmaksimovic"
    });
    
dbConn.connect(); 

app.get("/podatci", function(request, response){
    return response.send({message:"ok"});
})
app.get("/podaci/:id", function(request, response){
    var id = request.params.id+1;
    return response.send({message: id+" ok"});
})
app.post("/podaci", function(request, response){
    var podaci = request.body.podatak;
    return response.send({message: podaci+" ok"});
})
app.get("/televizori", function(request, response){
    dbConn.query('SELECT * FROM televizori', function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results, message: 'READ svi televizori' });
    //return response.send({message:"READ korisnik (svi)"})
    })
})

app.get("/televizori/:id", function(request, response){
    let televizori = request.params.id;
    if (!televizori) {
    return response.status(400).send({ error: true, message: 'Please provide televizori' });
    }
    dbConn.query('SELECT * FROM televizori where id=?', televizori, function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results[0], message: 'id televizora je'});
    });
    

   //var id = request.params.id;
   //return response.send({message: "READ korisnik "+id});
})
app.post("/televizori", function(request, response){
    var naziv = request.body.naziv;
    var rezolucija = request.body.rezolucija;   
    var velicina = request.body.velicina;
    var proizvodjac = request.body.proizvodjac; 
    var slika = request.body.slika;
    dbConn.query('INSERT INTO televizori VALUES(NULL,?,?,?,?,?)', [naziv, rezolucija, velicina, proizvodjac, slika], function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results[0], message: 'INSERT televizor naziv='+naziv });
        });
    //return response.send({message: "CREATE "+ime+" "+prezime});
})
app.put("/televizori/:id", function(request, response){
    
    var id = request.params.id;
    var velicina = request.body.velicina;
    dbConn.query('UPDATE televizori SET velicina=? WHERE id=?', [velicina, id], function (error, results, fields) {
        if (error) throw error;
        return response.send({ error: false, data: results[0], message: 'UPDATE televizori id= '+id+', velicina= '+velicina});
        });

    //return response.send({message: "UPDATE "+id+" nova adresa: "+adresa});
})
app.delete("/televizori/:id", function(request, response){
    var id = request.params.id;
    //return response.send({message: "DELETE "+id});
    dbConn.query('DELETE  FROM televizori where id=?', id, function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results[0], message: 'Izbrisan je televizor.' });
    });
})



// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
