const express = require("express");
const {login,logout,getAdmins, addSeller,signUp,getSellers,getUsers, deleteUser, deleteAdmin, numberOfUsers, numberOfAdmins} = require('../Controller/adminController')
const router = express.Router();


router.post('/login', login)
router.post('/signup', signUp)

router.get('/logout', logout);
router.get('/admins', getAdmins);
router.post('/addseller',addSeller);
router.get('/sellers', getSellers);
router.get('/users', getUsers);
router.get('/usersCount', numberOfUsers);
router.get('/adminsCount', numberOfAdmins);
router.post('/deleteUser', deleteUser);
router.post('/deleteAdmin', deleteAdmin);
module.exports = router;