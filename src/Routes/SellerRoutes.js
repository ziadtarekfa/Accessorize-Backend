const express = require("express");
const { logout, getSellers, login , addProduct,getImages,getModel,deleteProduct,updateImage,updateModel,updateProduct}= require('../Controller/sellerController')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/login', login)
router.get('/logout', logout);
router.get('/sellers', getSellers);
router.post('/addProduct',upload.any('images'),addProduct);
router.get('/getModel',upload.none(),getModel);
router.get('/getImages',upload.none(),getImages);
router.post('/deleteproduct',deleteProduct);
router.post('/updateimage',updateImage);
router.post('/updatemodel',updateModel);
router.post('/updateproduct',updateProduct);


module.exports = router;