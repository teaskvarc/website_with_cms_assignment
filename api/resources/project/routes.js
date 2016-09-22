const mongoose  = require('mongoose');
const server    = require('../../server').server;
const multer    = require('multer');

const crypto    = require('crypto');
const mime      = require('mime');
const auth      = require('../../helpers/auth/middleware');



var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(4, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

const upload = multer({ storage: storage });


module.exports = ()=>{

    server.post('/api/upload',auth, upload.single('file'), function (req, res) {

        console.log(req.file);
        res.send(req.file);

    });


    server.get('/api/projects',auth, (req, res)=>{

          const Project = mongoose.model('Project');

         //kako poiscemo vse projekte v bazi
          Project.find((err, docs)=>{

             if(!err){
                 res.send(docs);
             }else{
                 res.status(400).send(err);
             }
          });

      });

    server.get('/api/project/:id', auth,(req, res)=>{

        const projectId = req.params.id;

        const Project = mongoose.model('Project');

        Project.findById(projectId, (err, doc)=>{

           if(!err){
               res.send(doc);
           }else{
               res.status(400).send(err);
           }
        });
    });


    // SEARCH ! nacin s katerim iscemo po bazi - tukaj smo dolocili, da iscemo po: TITLE
    server.get('/api/project/search/:term', function (req, res) {
        const term = req.params.term;
        const Project = mongoose.model('Project');
        // i = da ne bo obcutljivo a je napisano z veliko ali malo crko
        Project.find({title:{$regex: new RegExp(term, 'i')}}, function (err, docs) {
           if(!err){
               res.send(docs);
           }else {
               res.status(400).send(err);
           }
        });
    });


    // route, ki bo vstavil v bazo projekt
    server.post('/api/project', auth, (req,res)=>{

        //req, ko pride na server prinese s sabo body
        const data = req.body;

        const Project = mongoose.model('Project');

        const newProject = new Project(data);

        newProject.save(function(err){

            if(!err){
                res.send(newProject);
            }else{
                res.status(400).send(err);
            }
        });
    });

    server.delete('/api/project/:id',auth, (req, res)=>{

        const projectId = req.params.id;

        const Project = mongoose.model('Project');

        Project.findByIdAndRemove(projectId, (err, doc)=>{

            if(!err){
                // tukaj dobimo, se zadnjic, dokument, ki smo ga izbrisali
                res.send(doc);
            }else{
                res.status(400).send(err);
            }

        });

    });

    server.put('/api/project/:id',auth, (req, res)=>{

        const projectId     = req.params.id;
        const projectData   = req.body;

        const Project = mongoose.model('Project');

        //mora poiskati projekt po id-ju, nam ga posodobi z novimi podatki = projectData
        // in pognati funkcijo, ko se vse uspesno zgodi
        // { new: true } = da bo projekt posodobljen z novimi podatki

        Project.findByIdAndUpdate(projectId, projectData, { new:true }, (err, doc)=>{

           if(!err){
               res.send(doc);
           }else{
               res.status(400).send(err);
           }

        });
    });
};
