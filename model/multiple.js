const mongoose = require('mongoose')

const bibleSchema = new mongoose.Schema({
    Country:{
        type: String,
        required:true
    },
    Cities:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Reviews:{
        type: String,
        required: true
    },
    Images:[{
        type: String
    }],
    Public_id:[{
        type: String
    }]
    },{timestamps:true})

    const bibleModel = mongoose.model("bibleprofile", bibleSchema)

module.exports= bibleModel