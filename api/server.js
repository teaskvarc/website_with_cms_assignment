const express           = require('express');
const server            = express();
const bodyParser        = require('body-parser');
const cors              = require('cors');

const PORT               = require('./config').PORT;

exports.server = server;

exports.init = ()=>{

    return new Promise((resolve, reject)=>{

        //vsak req, ki bo prisel na server, bo sel cez te tri middleware
        //sele potem gre req na routes, ki smo jih spisali
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true}));
        server.use(cors());
        server.use('/uploads', express.static('./uploads'));

        server.listen(PORT, ()=>{

            console.log('Server started');
            resolve();
        });

    });

};
