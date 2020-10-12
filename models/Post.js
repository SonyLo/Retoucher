const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  postsSchema = new Schema({
   

    srcBefore: {
        type:String
     },
    srcAfter:{
        type:String
     },
    text: {
        type:String
     },
    isFirstPage: {
        type:Number,
        default: 0
     },


    
})

module.exports = mongoose.model('posts', postsSchema)