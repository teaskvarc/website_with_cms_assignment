const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    email           : { type: String, unique: true },
    password        : String,
    dateCreated     : { type: Date, default: Date.now },
    name            : String,
    lastLogin       : { type: Date },
    tokens          : [{

        value: String,
        expires:
        {
           type: Date,
            default: function () {

                //token bo trajal dva tedna
                return +new Date() + 1000 * 60 * 60 * 24 * 14;
            }
        }
    }]

});

mongoose.model('Account', schema);