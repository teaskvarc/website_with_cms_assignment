
module.exports = [

    {
        role        :'user',
        methods     :['get', 'post', 'put', 'delete'],
        path        : '/api/articles'

    },

    {
        role        :'user',
        methods     :['get', 'post', 'put', 'delete'],
        path        : '/api/account/checklogin'

    }

];
