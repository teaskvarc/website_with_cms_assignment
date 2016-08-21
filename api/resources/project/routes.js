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

};
