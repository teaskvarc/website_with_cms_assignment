const mongoose = require('mongoose');
const server = require('../../server').server;



module.exports = ()=>{
    
  server.get('/articles', (req, res)=>{

      const Article = mongoose.model('Article');

      Article.find((err, docs)=>{
        if(!err){
            res.send(docs);
        }else{
            res.status(400).send(err);
        }
      });
  });

    server.get('article/:id', (req, res)=>{


        const articleId = req.params.id;

        const Article = mongoose.model('Article');

        Article.findById(articleId, (err, doc) =>{

            if(!err){
                res.send(doc);
            }else{
                res.status(400).send(err);
            }
        });
    });


    server.post('/article', (req,res)=>{

        const data = req.body;

        const Article = mongoose.model('Article');

        const newArticle = new Article(data);

        newArticle.save((err)=>{
            if(!err){
                res.send(newArticle);
            }else{
                res.status(400).send(err);
            }

        });
    });

    server.put('/article/:id', (req, res)=>{

        const articleId = req.params.id;
        const articleData = req.body;

        const Article = mongoose.model('Article');

        //mora poiskati projekt po id-ju, nam ga posodobi z novimi podatki = projectData
        // in pognati funkcijo, ko se vse uspesno zgodi
        // { new: true } = da bo projekt posodobljen z novimi podatki

        Article.findByIdAndUpdate(articleId, articleData, {new: true},  (err, doc) =>{

            if(!err){
                res.send(doc);
            }else{
                res.status(400).send(err);
            }

        });
    });

    server.delete('/article/:id', (req, res)=>{

        const articleId = req.params.id;

        const Article = mongoose.model('Article');

        Article.findByIdAndRemove(articleId, (err, doc) =>{

            if(!err){
                // tukaj dobimo, se zadnjic, dokument, ki smo ga izbrisali
                res.send(doc);
            }else{
                res.status(400).send(err);
            }
        });

    });

};