const mongoose = require('mongoose');

exports.init = ()=>{

   return new Promise((resolve, reject)=>{

       mongoose.connect('mongodb://localhost/web-cms-assignment');

       mongoose.connection.on('error', (err)=>{

           reject(err);
       });

       mongoose.connection.once('open', ()=>{

           console.log('Connection open');
           resolve();

       });

   });

};
