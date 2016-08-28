const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title         : String,
    content       : String,
    keyWords      : String,
    imageUrls     : [String],
    author        : String,
    published     : String,
    dateCreated   : { type:Date, default: Date.now },
    tags          : [String]

});

mongoose.model('Article', schema);