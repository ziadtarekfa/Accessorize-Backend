const express = require("express");
const { login, logout, signUp, getSellers, getUsers, deleteUser,
    numberOfUsers, numberOfSellers, deleteSeller, updateSeller, updateUser,
    recentUsers, recentSellers, getSellerById, getUserById, isLoggedIn }
    = require('../Controller/adminController')
const router = express.Router();


router.post('/login', login)
router.post('/signup', signUp)
router.get('/isLoggedIn', isLoggedIn);
router.get('/logout', logout);
router.get('/sellers', getSellers);
router.get('/sellerId/:id', getSellerById);
router.get('/userId/:id', getUserById);
router.get('/recentUsers', recentUsers);
router.get('/recentSellers', recentSellers);
router.get('/customers', getUsers);
router.get('/usersCount', numberOfUsers);
router.get('/sellersCount', numberOfSellers);
router.delete('/deleteUser', deleteUser);
router.delete('/deleteSeller', deleteSeller);
router.put('/updateSeller', updateSeller)
router.put('/updateUser', updateUser)
module.exports = router;