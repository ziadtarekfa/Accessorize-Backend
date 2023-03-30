// #Task route solution
const adminModel = require('../Models/Admin');
const Seller = require('../Models/seller');
const userModel = require('../Models/User');
const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'secret', {
        expiresIn: maxAge
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
        return res.status(404).json({ error: "No such admin" });
    } else {
        try {
            const hahsedpassword = await bcrypt.compare(password, admin.password);
            if (hahsedpassword) {
                const token = createToken(admin.email);
                res.cookie(' jwt', token, { httponly: true, maxAge: maxAge * 1000 });
                res.status(200).json("you are logged in")
            } else {
                res.status(400).json({ error: " your password is wrong" })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}
const logout = async (req, res) => {
    try {
        res.cookie('jwt', ""); //remove the value from our cookie.
        res.status(200).json("you are logged out")
    } catch (error) {
        res.status(406).json({ error: error.messages });
    }
}


const getAdmins = async (req, res) => {
    const users = await adminModel.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(users)
}

const getSellers = async (req, res) => {
    const sellers = await Seller.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(sellers)
}

const getUsers = async (req, res) => {
    const users = await userModel.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(users)
}

const deleteUser = (req,res)=>{
    userModel.deleteOne({email: req.body.email})
    .then(() => res.status(200).json({ message: "User Deleted" }))
    .catch((err) => res.status(400).send(err));
}
const deleteAdmin = (req,res)=>{
    adminModel.deleteOne({email: req.body.email})
    .then(() => res.status(200).json({ message: "Admin Deleted" }))
    .catch((err) => res.status(400).send(err));
}

const numberOfUsers = async (req,res)=>{
    try{
        let usersCount = await userModel.countDocuments({})
        res.status(200).json({usersCount})
    }
    catch (error) {
        res.status(400).json(err)
    }
}
const numberOfAdmins = async (req,res)=>{
    try{
        let adminsCount = await adminModel.countDocuments({})
        res.status(200).json({adminsCount})
    }
    catch (error) {
        res.status(400).json(err)
    }
}
const addSeller = async (req, res) => {

        try {
            const { name, email, password } = req.body;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const seller = await Seller.create({ name: name, email: email, password: hashedPassword });
            const token = createToken(seller.email);
    
            res.status(200).json(seller)//The HTTP 200 OK success status response code indicates that the request has succeeded
        } catch (error) {
            res.status(400).json({ error:"seller already exists with this email" })
        }
    }




// const signUp = async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const admin = await adminModel.create({ name: name, email: email, password: hashedPassword });
//         const token = createToken(admin.name);

//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json(admin)//The HTTP 200 OK success status response code indicates that the request has succeeded
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }
module.exports = { login, logout, getAdmins ,addSeller ,getSellers,getUsers,deleteUser,deleteAdmin,numberOfUsers,numberOfAdmins};