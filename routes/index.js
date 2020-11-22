var express = require('express');
var router = express.Router();
var bd = require('../config/bd')
const Post = require('../models/Post')
const upload = require('../config/upload')
var cloudinary = require('cloudinary');
const fs = require('fs')
const imagemin = require('imagemin');

const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const { post } = require('./users');


/* GET home page. */
router.get('/', async (req, res, next) => {

  const posts = await Post.find({ isFirstPage: 1 }).sort({ dateCreate: -1 }).limit(3)



  res.render('index', { title: 'retoucher-anastasiya', posts });
});



router.post('/addPost', upload.any(), async (req, res) => {

  // console.log(req.files[0].path.replace("\\", "/"));

  if (req.files) {
    let createPost = new Post();
    if (req.body.isMainCheck === 'on') {
      createPost.isFirstPage = 1
    }
    createPost.text = req.body.description

    const files = await imagemin([req.files[0].path.replace("\\", "/"), req.files[1].path.replace("\\", "/")], {
      destination: 'uploads/compress',
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });

    const el = await cloudinary.uploader.upload(files[0]['destinationPath'], function (result) { // BeforeR
      createPost.srcBefore = result.url
    })
    const el2 = await cloudinary.uploader.upload(files[1]['destinationPath'], function (result) { // BeforeR
      createPost.srcAfter = result.url
    })

    try{
      await createPost.save()
      
      fs.unlink(req.files[0].path, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })

      fs.unlink(req.files[1].path, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })

      fs.unlink(files[0]['destinationPath'], (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      fs.unlink(files[1]['destinationPath'], (err) => {
        if (err) {
          console.error(err)
          return
        }
      })

      res.status(200).json({
        status: "ok"
      })

    }catch(e){
      console.log(e)
      res.status(500).json({
        status: "bad"
      })
    }

  }


  
})





//  function savePost(post){
//   console.log(post)
//   // console.log(imgA)
// } 



//  async function compress(req){
//   let createPost = new Post();

//   if (req.body.isMainCheck === 'on') {
//     createPost.isFirstPage = 1
//   }
//   createPost.text = req.body.description

//   if (req.files) {
//    const res = await compress_images(req.files[0].path, 'uploads\\', { compress_force: false, statistic: true, autoupdate: true }, false,
//       { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
//       { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
//       { svg: { engine: "svgo", command: "--multipass" } },
//       { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
//       async function (error, completed, statistic) {
//         createPost.srcBefore = statistic['path_out_new']


//         await compress_images(req.files[1].path, 'uploads\\', { compress_force: false, statistic: true, autoupdate: true }, false,
//       { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
//       { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
//       { svg: { engine: "svgo", command: "--multipass" } },
//       { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
//       async function (error, completed, statistic) {
//         createPost.srcAfter = statistic['path_out_new']


//       return savePost(createPost) 

//   }
//   )

//   }
//   );



//   }

// }


router.get('/panel', function (req, res, next) {
  res.render('panel', { title: 'retoucher-anastasiya' });
});

router.get('/auth', function (req, res, next) {
  res.render('auth', { title: 'LogIn' });
});
module.exports = router;
