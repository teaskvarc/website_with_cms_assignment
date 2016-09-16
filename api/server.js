const express           = require('express');
const server            = express();
const bodyParser        = require('body-parser');
const database          = require ('./database');
const cors              = require('cors');
const mongoose          = require('mongoose');
const expressValidator  = require('express-validator');
const auth              = require('./helpers/auth/middleware');

const PORT               = require('./config').PORT;

exports.server = server;

server.locals.moment = require('moment');

exports.init = ()=>{

    return new Promise((resolve, reject)=>{

        //s tem smo povedali express server-ju, da bomo uporabljali ejs-template
        server.set('view engine', 'ejs');

        //vsak req, ki bo prisel na server, bo sel cez te tri middleware
        //sele potem gre req na routes, ki smo jih spisali
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true}));
        server.use(expressValidator());
        server.use(cors());
        server.use('/uploads', express.static('./uploads'));

        server.use('/app', express.static('app'));
        server.use('/static', express.static('static'));

        server.listen(PORT, ()=>{

            console.log('Server started');
            resolve();
        });

        server.get('/', (req, res) =>{

            res.render('landing', { pageName:'landing'});
        });

        server.get('/articles', (req, res) =>{

            var Article = mongoose.model('Article');

            var pageNum = req.query.page;
            var postCount = 4;


            Article.find((err, articleDocs) =>{

                //najprej preberemo dolzino clankov
                var pageLength = Math.ceil(articleDocs.length / postCount);

                var page = articleDocs.splice(pageNum * postCount, postCount);

                res.render('articles', {
                    articles        : page,
                    numberOfPages   : pageLength,
                    pageNum         : pageNum,
                    pageName        : 'articles'    // podatek, da ve kateri gumb mora obarvati v navigation

                });


            });

        });

        server.get('/article/:id', (req, res) =>{

            var articleId = req.params.id;

            var Article = mongoose.model('Article');

            Article.findById(articleId, (err, doc) =>{

                res.render('article', { article: doc });

            });

        });

        
        server.get('/projects', (req, res) =>{

            var Project = mongoose.model('Project');

            var pageNum = req.query.page;
            var projectCount = 4;

            Project.find((err, projectDocs) =>{

                var pageLength = Math.ceil(projectDocs.length / projectCount);
                var page = projectDocs.splice(pageNum * projectCount, projectCount);

               res.render('projects', {
                   projects         : page,
                   numberOfPages    : pageLength,
                   pageNum          : pageNum,
                   pageName         :'projects'


               });

            });
        });
        
        server.get('/project/:id', (req, res)=>{

           var projectId = req.params.id;

            var Project = mongoose.model('Project');

            Project.findById(projectId, (err, doc)=>{

                res.render('project', { project: doc });
                
            });

        });
    });

};
