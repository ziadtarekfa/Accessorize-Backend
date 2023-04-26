// #Task route solution
const userModel = require('../Models/User');
const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Item = require('../Models/Product');
const Order = require('../Models/order')
const Cart = require('../Models/Cart');
const mongodb = require("mongodb");
const favorites = require("../Models/Favourites");
const Product = require('../Models/Product');
const Address = require('../Models/Address');

const addressSchema = require('../Models/Address');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (email) => {
    return jwt.sign({ email }, 'secret', {
        expiresIn: maxAge
    });
};


const signUp = async (req, res) => {
    try {
        const {firstName,lastName,gender,birthDate,email,password,phoneNumber} =req.body
        const {country,state,city,street,floorNum,aptNum,zipCode} = req.body.address
        const address = {country,state,city,street,floorNum,aptNum,zipCode}

                // const userEntered = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // userEntered.password = hashedPassword;

        const user = await userModel.create({firstName,lastName,gender,birthDate,email,hashedPassword,phoneNumber,address});
        const token = createToken(user.email);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json("user created")

    } catch (err) {
        res.status(400).json(err.message);
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ error: "No such user" });
    } else {
        try {
            const hashedpassword = await bcrypt.compare(password, user.password);
            // let hashedpassword=password
            if (hashedpassword) {
                const token = createToken(user.email);
                res.cookie('jwt', token, { httponly: true, maxAge: maxAge * 1000 });
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


const getUsers = async (req, res) => {
    const users = await userModel.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(users)
}



const searchProduct = async (req, res) => {
    try {
        const search = req.query.search;
        const products = await Item.find({ productName: { $regex: search, $options: "i" } })
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json({ error: error.messages });
    }

}


const addToFavourites = async (req, res) => {
    let userEmail = jwt.verify(req.cookies.jwt, 'secret')
    let ID = req.body.productID
    let favourite = new favorites({
        productID: ID,
        userEmail: userEmail.email
    })
    favourite.save()
        .then((result) => res.status(200).json("Added to favourites"))
        .catch((err) => res.status(400).json({ error: err }))

}


const getTotal = async (req, res) => {
    // let IDs = req.body.item
    // let total = 0
    // let items = await Item.find({ productID: { $in: IDs } });
    // items.forEach((item) => {
    //     total += item.productPrice
    // })
    // return total

    let total=0;
    req.body.items.forEach((item)=>{
        total+=item.total
    })
    return total;
}

const makeAnOrder = async (req, res) => {
    let date = Date.now().toString()
    let user = jwt.verify(req.cookies.jwt, 'secret')
    let total = await getTotal(req)
    let order = new Order({
        date: date,
        shippingAddress:req.body.address,
        status: 'Pending',
        total: total,
        items:req.body.items,
        userEmail: user.email
    })
    order.save()
        .then((result) => res.status(200).json("order Saved"))
        .catch((err) => res.status(400).json({ error: err }))
}

const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(products)
}

const getCategorizedProducts = async (req, res) => {
    const products = await Product.find({ categoryID: req.body.categoryID }).sort({ createdAt: -1 }) //descending order
    res.status(200).json(products)
}

const updateUser = (req, res) => {
    userModel.findOneAndUpdate(
        { email: req.body.email },
        {
            $set: {
                phoneNumber: req.body.phoneNumber,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                city: req.body.birthdat,
                zipCode: req.body.zipCode,
                streetAddress: req.body.streetAddress,
                floorNum: req.body.floorNum,
                aptNum: req.body.aptNum,
            },
        },
        { new: true },
        (err, doc) => {
            if (err) {
                res.status(406).json({ error: error.messages });
            }
            else
                res.status(200).json(doc);
        }

    );
};
const deleteUser = async (req, res) => {

    userModel.deleteOne({ _id: req.body.id })
        .then(() => res.json({ message: "User deleted" }))
        .catch((err) => res.send(err));


};

const deleteFromFavorites = (req, res) => {
    favorites.deleteOne({ productID: req.body.productID })
        .then(() => res.json({ message: "Product removed from favorites" }))
        .catch((err) => res.send(err));
}

module.exports = {
    signUp, logout, getUsers, login, searchProduct, makeAnOrder, getProducts,
    addToFavourites, updateUser, deleteUser, deleteFromFavorites, getCategorizedProducts
};
