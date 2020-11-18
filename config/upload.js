const multer = require('multer')
const moment = require('moment')
var cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'hs6le7asy', 
  api_key: '155365474856135', 
  api_secret: 'bYMrewzl-Al0z5PMGIJcqdoszyA' 
});


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
   
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
    cb(null, true)
  } else {
    cb(null, false)
  }
  
}

const limits = {
  fileSize: 1024 * 1024 * 25
}

module.exports = multer({storage, fileFilter, limits})













