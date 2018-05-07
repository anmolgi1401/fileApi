// Dependencies 

var fileApi = require('./manager/file-system_manager');


// Container for lib (to be exported)

var lib = {};


// Configre the base directory

lib.config = function(path){

	 var path = typeof(path) == 'string' ? path : '';

	 if(path.length>0){

	 	// set the configured path in the libery
	 	lib.path = path;

	 }
}

lib.create  = function(dir,fileName,data,callback){
	fileApi.create(lib.path,dir,fileName,data,(err)=>{
		if(!err){
			callback(false);
		} else {
			callback(err)
		}
	});
}

lib.read  = function(dir,filenName,callback){
	fileApi.read(lib.path,dir,fileName,(err,data)=>{
		if(!err){
			callback(false,data);
		} else {
			callback(err)
		}
	});
}

lib.update  = function(dir,filenName,data,callback){
	fileApi.update(lib.path,dir,fileName,data,(err)=>{
		if(!err){
			callback(false);
		} else {
			callback(err)
		}
	});
}

lib.delete  = function(dir,filenName,callback){
	fileApi.delete(lib.path,dir,fileName,data,(err)=>{
		if(!err){
			callback(false);
		} else {
			callback(err)
		}
	});
}

module.exports = lib;