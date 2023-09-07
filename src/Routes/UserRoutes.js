const express = require("express");
const { signUp, logout, getUsers, login,searchProduct,addToFavourites,makeAnOrder,updateUser,deleteUser,deleteFromFavorites, getProducts, getCategorizedProducts }=require('../Controller/userController');
const router = express.Router();

router.post("/signup", signUp);
router.post('/login', login)
router.get('/logout', logout);
router.get('/getusers', getUsers);

router.get('/searchproduct',searchProduct);
router.post('/favourites',addToFavourites);
router.post('/order',makeAnOrder);
router.get('/products',getProducts);
router.get('/categorizedProducts',getCategorizedProducts);
router.post('/updateuser',updateUser);

router.post('/deleteuser',deleteUser);
router.post('/deletefromfavorites',deleteFromFavorites);

module.exports = router;