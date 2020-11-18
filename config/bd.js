const mongoose = require('mongoose');
const variable = require('./varible');
mongoose.connect(variable.URL, {useNewUrlParser: true, useUnifiedTopology: true});


