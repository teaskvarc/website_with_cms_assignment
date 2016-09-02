const mongoose  = require('mongoose');
const server    = require('../../server').server;
const bcrypt    = require('bcryptjs');

const AccountModel = mongoose.model('Account');


module.exports = ()=>{


    server.post('/api/account', (req, res) =>{

        var newAccount = new AccountModel({

           email    : req.body.email,
            name    : req.body.name

        });


    });

    server.get('/api/account', (req, res) =>{



   });

};
