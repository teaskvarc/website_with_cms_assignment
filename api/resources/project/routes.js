const mongoose  = require('mongoose');
const server    = require('../../server').server;

module.exports = ()=>{

      server.get('/projects', (req, res)=>{

          const Project = mongoose.model('Project');

         //kako poiscemo vse projekte v bazi
          Project.find((err, docs)=>{

             res.send(docs);

          });

      });

    // route, ki bo vstavil v bazo projekt
    server.post('/project', (req,res)=>{

        //req, ko pride na server prinese s sabo body
        const data = req.body;

        const Project = mongoose.model('Project');

        const newProject = new Project(data);

        newProject.save(()=>{

            res.send(newProject);

        });
    });

    server.delete('/project/:id', (req, res)=>{

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

    server.put('/project/:id', (req, res)=>{

        const projectId     = req.params.id;
        const projectData   = req.body;

        const Project = mongoose.model('Project');

        //mora poiskati projekt po id-ju, nam ga update s podatki = projectData
        // in pognati funkcijo, ko se vse uspesno zgodi

        Project.findByIdAndUpdate(projectId, projectData, { new:true }, (err, doc)=>{

           if(!err){
               res.send(doc);
           }else{
               res.status(400).send(err);
           }

        });
    });
};
