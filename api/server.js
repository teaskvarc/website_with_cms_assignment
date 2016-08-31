const express           = require('express');
const server            = express();
const bodyParser        = require('body-parser');
const database          = require ('./database');
const cors              = require('cors');
const mongoose          = require('mongoose');

const PORT               = require('./config').PORT;

exports.server = server;

exports.init = ()=>{

    return new Promise((resolve, reject)=>{

        //s tem smo povedali express server-ju, da bomo uporabljali ejs-template
        server.set('view engine', 'ejs');

        //vsak req, ki bo prisel na server, bo sel cez te tri middleware
        //sele potem gre req na routes, ki smo jih spisali
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true}));
        server.use(cors());
        server.use('/uploads', express.static('./uploads'));

        server.use('/app', express.static('app'));
        server.use('/static', express.static('static'));

        server.listen(PORT, ()=>{

            console.log('Server started');
            resolve();
        });

        server.get('/', (req, res) =>{

            res.render('landing');
        });

        server.get('/articles', (req, res) =>{

            const Article = mongoose.model('Article');

            Article.find((err, articleDocs) =>{

                res.render('articles', { articles: articleDocs });

            });

        });
    });

};
