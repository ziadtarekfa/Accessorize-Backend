const express = require("express");
const { login, logout, getAdmins, addSeller, signUp, getSellers, getUsers, deleteUser, deleteAdmin, numberOfUsers, numberOfAdmins, numberOfSellers, deleteSeller, updateSeller, updateUser, recentUsers, recentSellers, getSellerById, getUserById } = require('../Controller/adminController')
const router = express.Router();


router.post('/login', login)
router.post('/signup', signUp)

router.get('/logout', logout);
router.get('/admins', getAdmins);
router.post('/addseller', addSeller);
router.get('/sellers', getSellers);
router.get('/sellerId/:id', getSellerById);
router.get('/userId/:id', getUserById);
router.get('/recentUsers', recentUsers);
router.get('/recentSellers', recentSellers);
router.get('/users', getUsers);
router.get('/usersCount', numberOfUsers);
router.get('/adminsCount', numberOfAdmins);
router.get('/sellersCount', numberOfSellers);
router.delete('/deleteUser', deleteUser);
router.delete('/deleteSeller', deleteSeller);
router.post('/deleteAdmin', deleteAdmin);
router.put('/updateSeller', updateSeller)
router.put('/updateUser', updateUser)
module.exports = router;