var server      = require('./server');
var database    = require('./database');
const config    = require('./config');

database.init()
    .then(server.init)
    .then(()=>{
        require('./resources')();
    })
    .then(()=>{

        console.log('All is well | on port: '+config.PORT);

    })
    .catch((err)=>{

        console.log('Error:',err);

    });

