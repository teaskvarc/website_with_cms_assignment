const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title         : String,
    body          : String,
    imageUrls     : [String],
    author        : String,
    dateCreated   : { type:Date, default: Date.now },
    tags          : [String]

});

mongoose.model('Article', schema);