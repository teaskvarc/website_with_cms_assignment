// tukaj se definirajo vloge (role) in kaj le te lahko pocnejo

const _ = require('lodash');

const list = [

    {
        path: '/api/articles',
        roles:[
            {
                type:'user',
                methods: ['get', 'post', 'put', 'delete']
            }
        ]
    },
    {
        path:'/api/article',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {
        path:'/api/article(/:id)',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {
        path:'/new-article',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {

        path: '/api/projects',
        roles: [
            {
                type:'user',
                methods: ['get', 'post', 'put', 'delete']
            }
        ]
    },
    {
        path:'/api/project',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {
        path:'/api/project(/:id)',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {
        path:'/new-project',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {
        path:'/api/upload',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    },
    {
        path: '/api/account/checkLogin',
        roles:[
            {
                type:'user',
                methods:['get', 'post', 'put', 'delete']
            }
        ]
    },
    {
        path:'/api/account/logout',
        roles:[
            {
                type:'user',
                methods:['get','put','post','delete']
            }
        ]
    }
];

exports.getPermissionsForRole = function (role) {

    var permissions = [];

    _.each(list, (item, i)=>{

        const roleMethods = _.find(item.roles, {type:role});

        if(roleMethods){
            permissions.push({

                path:item.path,
                methods:roleMethods.methods

            });
        }

    });

    return permissions;

};

exports.list = list;
