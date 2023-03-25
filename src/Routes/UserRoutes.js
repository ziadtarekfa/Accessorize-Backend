const express = require("express");
const { signUp, logout, getUsers, login,searchProduct,addToFavourites,makeAnOrder,updateUser,deleteUser,deleteFromFavorites }=require('../Controller/userController');
//const {addItemToCart,getItemsInCart} = require('../Controller/cartController')
const router = express.Router();

router.post("/signup", signUp);
router.post('/login', login)
router.get('/logout', logout);
router.get('/getusers', getUsers);
// router.post('/addItemToCart',addItemToCart);
// router.get('/getItemsInCart', getItemsInCart);
// router.post('/addProductToCart', addProductToCart);

router.get('/searchproduct',searchProduct);

router.post('/favourites',addToFavourites);
router.post('/order',makeAnOrder);
router.post('/updateuser',updateUser);

router.post('/deleteuser',deleteUser);
router.post('/deletefromfavorites',deleteFromFavorites);

module.exports = router;