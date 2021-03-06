// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// Container for module (to be exported)

// Container for the library( to be exported)
var lib = {};

//create dir and file if not exist

lib.create = function(basefile,dir,filename,data,callback){

    if(!fs.existsSync(basefile)){
      fs.mkdirSync(basefile);
      if(dir.length>0){
        fs.mkdirSync(basefile+'/'+dir);
        lib._create(basefile,dir,filename,data,err =>{
          if(!err){
            callback(false);
          } else {
            callback(err);
          }
        })
      }else{
        lib._create(basefile,dir,filename,data,err=>{
          callback(err);
        })
        
        }
    } else {
      if(!fs.existsSync(basefile+'/'+dir)){
            fs.mkdirSync(basefile+'/'+dir);
            lib._create(basefile,dir,filename,data,(err) =>{
              if(!err){
                callback(false)
              } else{
                callback(err);
              }
            })
    } else {
      lib._create(basefile,dir,filename,data,err =>{
        callback(err);
      })
    }
}
}

// Write data to a file
lib._create = function(basefile,dir,file,data,callback){
 fs.open(basefile+'/'+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });

};

// Read data from a file
lib.read = function(dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};

// Update data in a file
lib.update = function(dir,file,data,callback){

  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Truncate the file
      fs.truncate(fileDescriptor,function(err){
        if(!err){
          // Write to file and close it
          fs.writeFile(fileDescriptor, stringData,function(err){
            if(!err){
              fs.close(fileDescriptor,function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('Error closing existing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet');
    }
  });

};

// Delete a file
lib.delete = function(dir,file,callback){

  // Unlink the file from the filesystem
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    callback(err);
  });

};

// Export the module
module.exports = lib;
