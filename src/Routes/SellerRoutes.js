const express = require("express");
const { logout, login,
    addProduct, getProductById, updateProfile, signUp,
    getProducts, deleteProduct,
    updateModel, updateProduct, getOrders, getOrderById, getUserByEmail, getProfile } = require('../Controller/sellerController');
const router = express.Router();
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });

router.post('/login', login)
router.post('/register', signUp);
router.get('/logout', logout);
router.post('/addProduct', upload.any(), addProduct);
router.get('/getProducts', getProducts);
router.get('/getProductById/:id', getProductById);
router.get('/getOrders', getOrders);
router.get('/getOrderById/:id', getOrderById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/updateProfile', updateProfile);
router.get('/getProfile', getProfile);
router.post('/deleteproduct', deleteProduct);
router.patch('/updatemodel/:id', upload.any(), updateModel);
router.patch('/updateproduct/:id', upload.any(), updateProduct);


module.exports = router;