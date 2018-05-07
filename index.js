var filesystem = require('./lib/index');

filesystem.config('/home/anmol/Desktop/data',{isreated:false});

filesystem.create ('anmol3','anmol7','reandom string',(err)=>{
	console.log(err);
})