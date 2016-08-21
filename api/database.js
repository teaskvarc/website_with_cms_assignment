const mongoose = require('mongoose');

exports.init = ()=>{

    mongoose.connect('mongodb://localhost/web-cms-assignment');

    mongoose.connection.on('error', (err)=>{

       console.log(err);
        throw new Error(err);
    });

    mongoose.connection.once('open', ()=>{

       console.log('Connection open');

    });

};
