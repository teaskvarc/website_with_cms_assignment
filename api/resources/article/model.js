const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title         : { type: String, required: true },
    content       : String,
    keyWords      : String,
    imageUrls     : [String],
    author        : String,
    published     : { type: Date, default: Date.now },
    dateCreated   : { type: Date, default: Date.now }


});

mongoose.model('Article', schema);