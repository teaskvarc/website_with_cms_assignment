const server = require('../../server').server;

module.exports = ()=>{
    
  server.get('/articles', (req, res)=>{
     
      res.send('Hello world articles');
      
  });
};