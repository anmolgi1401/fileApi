// Dependencies 

var fileApi = require('./manager/file-system_manager');
var path = require('path');


// Container for lib (to be exported)

var lib = {};


// Configre the base directory

lib.config = function(path,options){

	 var path = typeof(path) == 'string' ? path : '';
	 var options = typeof(options) == 'object' && options !==null ? options : {};

	 if(path.length>0){
	 	if(options !==null && options.isRealated){

	 		lib.path = path.join(__dirname,path);
	 	} else {
	 		lib.path = path;
	 	}

	 	// set the configured path in the libery
	 	lib.path = path;

	 }
}



// create a file and struture
lib.create  = function(dir,fileName,data,callback){
	fileApi.create(lib.path,dir,fileName,data,(err)=>{
		if(!err){
			callback(false);
		} else {
			callback(err)
		}
	});
}

// read data from file
lib.read  = function(dir,filenName,callback){
	fileApi.read(lib.path,dir,fileName,(err,data)=>{
		if(!err){
			callback(false,data);
		} else {
			callback(err)
		}
	});
}

// update the file 
lib.update  = function(dir,filenName,data,callback){
	fileApi.update(lib.path,dir,fileName,data,(err)=>{
		if(!err){
			callback(false);
		} else {
			callback(err)
		}
	});
}

//delete the file
lib.delete  = function(dir,filenName,callback){
	fileApi.delete(lib.path,dir,fileName,data,(err)=>{
		if(!err){
			callback(false);
		} else {
			callback(err)
		}
	});
}

//module to exported
module.exports = lib;