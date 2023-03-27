// #Task route solution
const adminModel = require('../Models/Admin');
const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sellerModel = require('../Models/seller');


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
                res.status(200).json(token)
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
const addSeller = async (req, res) => {

        try {
            const { name, email, password } = req.body;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const seller = await sellerModel.create({ name: name, email: email, password: hashedPassword });
            const token = createToken(seller.email);
    
            res.status(200).json(token)//The HTTP 200 OK success status response code indicates that the request has succeeded
        } catch (error) {
            res.status(400).json({ error:"seller already exists with this email" })
        }
    }



const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = await adminModel.create({ name: name, email: email, password: hashedPassword });
        const token = createToken(admin.name);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(admin)//The HTTP 200 OK success status response code indicates that the request has succeeded
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = { login, logout, getAdmins ,addSeller,signUp };