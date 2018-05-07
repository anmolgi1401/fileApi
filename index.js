var filesystem = require('./lib/index');

filesystem.config('/home/anmol/Desktop/data',{isreated:false});

filesystem.create ('anmol4','anmol2','reandom string',(err)=>{
	console.log(err);
})