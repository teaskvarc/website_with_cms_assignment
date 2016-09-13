// tukaj se definirajo vloge (role) in kaj le te lahko pocnejo

module.exports = [

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
        path: '/api/account/checkLogin',
        roles:[
            {
                type:'user',
                methods:['get', 'post', 'put', 'delete']

            }
        ]



    }
    

];
