var express = require('express');
var routes = require('../routes/index.js');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
/*
module.exports.selectFichero=function(req,res){
	res.json(fichero);
};
module.exports.getIdFichero=function(req,res){
  var id=req.params.id;
  var actor={};
  for (var f=0,itera=true;f<fichero.length && itera;f++){
  	if (fichero[f].id==id){
  		actor=fichero[f];
  		itera=false;
  	}
  }
  res.json(actor);
};
module.exports.getpIdFichero=function(req,res){
  var id=req.body.id;
  var actor=[{}];
  for (var f=0,itera=true;f<fichero.length && itera;f++){
  	if (fichero[f].id==id){
  		actor[0]=fichero[f];
  		itera=false;  	}
  }
  res.json(actor);
};
module.exports.modificaFicheroActor=function(req,res){
  var actor=req.body.actor;
  console.log(actor);
  for (var f=0,itera=true;f<fichero.length && itera;f++){
  	console.log("iterando fichero[f].id"+fichero[f].id+"_ actor.id"+actor.id);
  	if (fichero[f].id==actor.id){
  		fichero[f]=actor;
  		console.log("entroo");
  		itera=false;
  	}
  }
  console.log(fichero);
  res.status(200).end();
};
module.exports.insertaFicheroActor=function(req,res){
    var actor=req.body.actor;
	fichero.push(actor);
	res.status(200).end();
}
module.exports.eliminaFicheroActor=function(req,res){
    var actor=req.body.actor;
	for (var f=0,itera=true;f<fichero.length && itera;f++){
		if (fichero[f].id==actor.id){
			fichero.splice(f,1);
			itera=false;
		}
	}
	res.status(200).end();
}
module.exports.insertaMysqlActor=function(req,res){
    var actor=req.body.actor;
    var conect=connection.createConnection();
	conect.connect();
	var sql=mysql.format("insert into actores (id,first_name,last_name) values(?,?,?)",
		                                  [actor.id,actor.first_name,actor.last_name]);
	conect.query(sql,function(err,rows,fields){
		if (err) {
			conect.end();
			res.status(500).end();
			return;
		}
		res.json("insertado correctamente");
	});
}
module.exports.modificaMysqlActor=function(req,res){
	var actor=req.body.actor;
	var conect=connection.createConnection();
	conect.connect();
	console.log(actor);
	conect.query(mysql.format("update actores set first_name=?,last_name=? where id=?",
									[actor.first_name,actor.last_name,actor.id]),
	function(err,rows,fields){
		if (err){
			res.status(500).end();
		}
		res.status(200).end();
		conect.end();
	});
}
module.exports.eliminaMysqlActor=function(req,res){
	var id=req.body.id;
	var conect=connection.createConnection();
	conect.connect();
	conect.query(mysql.format("delete from actores where id=?",[id]),function(err,rows,fields){
		console.log(rows);
		res.json(rows);
		conect.end();
	});
}
module.exports.selectMysql=function(req,res){
	var conect=connection.createConnection();
	conect.connect();
	conect.query("select * from actores order by last_name",function(err,rows,fields){
		console.log(rows);
		res.json(rows);
	});
	conect.end();
}
module.exports.getIdMysql=function(req,res){
	var id=req.body.id;
	var conect=connection.createConnection();
	conect.connect();
	conect.query(mysql.format("select * from actores where id=?",[id]),function(err,rows,fields){
		console.log(rows);
		res.json(rows);
	});
	conect.end();
}
*/
module.exports.plantaDatos = plantaDatos;
module.exports.insertUser = insertUser;
module.exports.getUser  = getUser;
module.exports.userLogin  = userLogin;

//////

function plantaDatos (req,res) {
	res.json({nombre: 'jacinto'});
}
function insertUser(req,res) {
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('user');

    collection.insert({name: 'juan',password: 'juan'}, function (err, result) {
      if (err) {
        console.log('fallo al insertar');
      }
      console.log(result);
      res.json(result);
    });
  });
}

function getUser(req,res,next) {
  if (isObjectID(req.params.id)) {
    var objetId = mongo.ObjectID(req.params.id);
  }
  else {
    res.status(400).json({message: 'id no válido'});
    return;
  }
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    if(err) { return console.dir(err); }

    var collection = db.collection('user');
    collection.findOne({_id: objetId}, function (err, result) {
      if (err) {
        console.log('fallo al hacer get');
        res.status(500).json({message: 'fallo al hacer el get'});
        return;
      }
      if (result == null) {
        console.log('no encontrado');
        res.status(404).json({message: 'no encontrado'});
        return;
      }
      console.log(result);
      res.json(result);
    });
  });
}
function userLogin(req, res) {
  var usuario = req.body;
  // Connect to the db
  MongoClient.connect("mongodb://localhost:27017/plantas", function(err, db) {
    var collection = db.collection('user');
    //compara usuario y password en la bd
    collection.find({name: usuario.nombre, password: usuario.password}).toArray(function(err, result) {
      console.log(result);
      if (result.length==0) {
        res.status(400).json({message: 'login incorrecto'});
        return;
      }
      res.json(result);
      });
  });
  console.log(usuario);
}

//libs
function isObjectID(id) {
  return (id.match(/^[0-9a-fA-F]{24}$/));
}