var express = require('express');
var router = express.Router();
var bd = require('../config/bd')
const Post = require('../models/Post')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/addPost', (req, res)=>{
  const post = new Post({ 
    srcBefore: 'images/work/EOSR8589.jpg',
    srcAfter: '/images/work/EOSR8589.jpg',
    text: "LOREM"
  });
  post.save().then(() => console.log('meow'));
})



router.get('/panel', function(req, res, next) {
  res.render('panel', { title: 'Express' });
});

module.exports = router;
