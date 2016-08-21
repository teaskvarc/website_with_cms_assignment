module.exports = ()=>{

    require('./article/model');
    require('./article/routes')();

    require('./project/model');
    require('./project/routes')();


};