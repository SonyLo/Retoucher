const mongoose = require('mongoose');
const variable = require('./varible');
mongoose.connect(variable.URL, {useNewUrlParser: true, useUnifiedTopology: true});

const Post = mongoose.model('Post', 
{ 
    srcBefore: String,
    srcAfter: String,
    text: String,
    isFirstPage: Number

});

