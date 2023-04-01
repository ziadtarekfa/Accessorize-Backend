const express = require("express");
const {login,logout,getAdmins, addSeller,signUp,getSellers,getUsers, deleteUser, deleteAdmin, numberOfUsers, numberOfAdmins, numberOfSellers, deleteSeller, updateSeller, updateUser, recentUsers, recentSellers} = require('../Controller/adminController')
const router = express.Router();


router.post('/login', login)
router.post('/signup', signUp)

router.get('/logout', logout);
router.get('/admins', getAdmins);
router.post('/addseller',addSeller);
router.get('/sellers', getSellers);
router.get('/recentUsers', recentUsers);
router.get('/recentSellers', recentSellers);
router.get('/users', getUsers);
router.get('/usersCount', numberOfUsers);
router.get('/adminsCount', numberOfAdmins);
router.get('/sellersCount', numberOfSellers);
router.post('/deleteUser', deleteUser);
router.post('/deleteSeller', deleteSeller);
router.post('/deleteAdmin', deleteAdmin);
router.post('/updateSeller',updateSeller)
router.post('/updateUser',updateUser)
module.exports = router;