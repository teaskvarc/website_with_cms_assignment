const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title         : { type: String, required: true },
    content       : String,
    imageUrls     : [String],
    coverImage    : String,
    link          : String,
    author        : String,
    dateCreated   : { type:Date, default: Date.now },
    tags          : [String]


});

mongoose.model('Project', schema);