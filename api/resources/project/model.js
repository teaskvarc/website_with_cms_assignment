const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title         : String,
    body          : String,
    imageUrls     : [String],
    link          : String,
    status        : { type: Boolean, default: false },
    author        : String,
    dateCreated   : { type:Date, default: Date.now },
    tags          : [String],
    

});

mongoose.model('Project', schema);