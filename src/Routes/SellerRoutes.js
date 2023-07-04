const express = require("express");
const { logout, getSellers, login,
    addProduct, getProductById, updateProfile, signUp,
    getProducts, getImages, getModel, deleteProduct,
    updateImage, updateModel, updateProduct, getOrders, getOrderById, getUserByEmail, getProfile } = require('../Controller/sellerController');
const router = express.Router();
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });

router.post('/login', login)
router.post('/register', signUp);
router.get('/logout', logout);
router.get('/sellers', getSellers);
router.post('/addProduct', upload.any(), addProduct);
router.get('/getProducts', getProducts);
router.get('/getProductById/:id', getProductById);
router.get('/getModel', upload.none(), getModel);
router.get('/getImages', upload.none(), getImages);
router.get('/getOrders', getOrders);
router.get('/getOrderById/:id', getOrderById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/updateProfile', updateProfile);
router.get('/getProfile', getProfile);
router.post('/deleteproduct', deleteProduct);
router.post('/updateimage', updateImage);
router.patch('/updatemodel/:id', upload.any(), updateModel);
router.patch('/updateproduct/:id', upload.any(), updateProduct);


module.exports = router;