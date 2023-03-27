const express = require("express");
const {login,logout,getAdmins, addSeller,signUp} = require('../Controller/adminController')
const router = express.Router();


router.post('/login', login)
router.post('/signup', signUp)

router.get('/logout', logout);
router.get('/admins', getAdmins);
router.post('/addseller',addSeller);
module.exports = router;