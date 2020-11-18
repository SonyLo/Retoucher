var express = require('express');
var router = express.Router();
var bd = require('../config/bd')
const Post = require('../models/Post')
const upload = require('../config/upload')
var cloudinary = require('cloudinary');
const fs = require('fs')

const { post } = require('./users');


/* GET home page. */
router.get('/', async (req, res, next) => {

  const posts = await Post.find({isFirstPage:1}).sort({dateCreate: -1}).limit(3)
  //const sortPost = await Post.find({}).sort({dateCreate: -1})
  console.log(posts)

  res.render('index', { title: 'retoucher-anastasiya', posts });
});


router.post('/addPost', upload.any(), async (req, res) => {
  let createPost = new Post();
  if (req.files) {
    const el = await cloudinary.uploader.upload(req.files[0].path, function (result) { // BeforeR
      createPost.srcBefore = result.url
    })
  }

  if (req.files) {
    const el = await cloudinary.uploader.upload(req.files[1].path, function (result) { //AfterR
      createPost.srcAfter = result.url
    })
  }

  if (req.body.isMainCheck === 'on') {
    createPost.isFirstPage = 1
  }
  createPost.text = req.body.description
  //console.log(req.files[1].path)
  
  try{
    await createPost.save()
    
    fs.unlink(req.files[1].path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })

    fs.unlink(req.files[0].path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })


    res.status(200).json({
      status: "ok"
    })
  }catch(e){
    res.status(500).json({
      status: "bad"
    })
  }
 
  // res.render('panel', { title: 'retoucher-anastasiya' });
  // post.save().then(() => console.log(this.post));
})



router.get('/panel', function (req, res, next) {
  res.render('panel', { title: 'retoucher-anastasiya' });
});

router.get('/auth', function (req, res, next) {
  res.render('auth', { title: 'LogIn' });
});


module.exports = router;
