const mongoose  = require('mongoose');
const server    = require('../../server').server;
const bcrypt    = require('bcryptjs');
const randToken = require ('rand-token');

const AccountModel = mongoose.model('Account');


module.exports = ()=>{


    server.post('/api/account', (req, res) =>{

        // na tak nacin naredim VALIDACIJO na body

        req.checkBody('email', 'Not a valid email').isEmail();
        req.checkBody('password', 'Not a valid password').notEmpty().isLength({min:8});

        var errors = req.validationErrors();
        if(errors) return res.send(errors, 400);

        bcrypt.genSalt(10, (err, salt)=>{

            bcrypt.hash(req.body.password, salt, (err, hash) =>{

                if(!err){

                    const token = randToken.generate(255);

                    var newAccount = new AccountModel({

                        email       : req.body.email,
                        name        : req.body.name,
                        password    : hash,
                        tokens      : [{ value: token }]

                    });

                    //to je podatek, ki ga dobimo nazaj
                    newAccount.save()
                        .then(()=>{
                           res.send({
                               token:token,
                               email:newAccount.email
                           });
                        })
                        .catch((err)=>{
                            res.send(err, 400);
                        });

                }else{
                    res.send(err, 400);
                }
            });
        });
    });

    server.get('/api/account', (req, res) =>{



   });

};
