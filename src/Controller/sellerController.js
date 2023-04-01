// #Task route solution
const sellerModel = require('../Models/seller');
const { default: mongoose } = require('mongoose');
const Model = require('../Models/models')
const Images = require('../Models/images')
const Product = require('../Models/Product')
const cloudinary = require('../Models/cloudinary')
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
// create json web token



const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'secret', {
        expiresIn: maxAge
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const seller = await sellerModel.findOne({ email: email });
    if (!seller) {
        return res.status(404).json({ error: "No such seller" });
    } else {
        try {
            const hahsedpassword = await bcrypt.compare(password, seller.password);
            if (hahsedpassword) {
                const token = createToken(seller.email);
                res.cookie('jwt', token, { httponly: true, maxAge: maxAge * 1000 });
                res.status(200).json( token)
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

const getSellers = async (req, res) => {
    const sellers = await sellerModel.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(sellers)
}
//admin adds seller 
// const signUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const seller = await sellerModel.create({ name: name, email: email, password: hashedPassword });
//         const token = createToken(seller.email);

//         // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json(seller)//The HTTP 200 OK success status response code indicates that the request has succeeded
//     } catch (error) {
//         res.status(400).json({ error:"user already exists with this email" })
//     }
// };


const addProduct = async (req, res) => {
    try {
        let productsCount = await Product.countDocuments({})
        let { productName, productPrice, categoryID, position, size } = req.body
        let sellerEmail = jwt.verify(req.cookies.jwt, 'secret')
        const product = await Product.create({
            productID: productsCount + 1,
            productName: productName,
            productPrice: productPrice,
            categoryID: categoryID,
            sellerEmail: sellerEmail.name,
        });
        req.body.productID = product.productID
        const result = await cloudinary.uploader.upload(req.files[0].path, {
            folder: "Models",
            resource_type: "auto",
            format: "FBX"
        })
        const model = await Model.create({
            productID: req.body.productID,
            position: position,
            modelLink: result.secure_url,
            size: size
        });
        // await addModel(req,res)
        for (let i = 1; i < (req.files.length); i++) {
            // images.push(req.files[i])
            let result = await cloudinary.uploader.upload(req.files[i].path, {
                folder: "Images",
                resource_type: "auto",
                format: "PNG"
            })
            let image = await Images.create({
                productID: req.body.productID,
                imageLink: result.secure_url
            });
        }
        // await addImage(req,res)
        res.status(200).json(product);

    }
    catch (error) {
        console.log(error);
        res.status(406).json({ error: error.messages });
    }
}


const getModel = async (req, res) => {
    try{
        Model.findOne({ productID: req.body.productID })
        .then(model => {
            let modelLink = model.modelLink
            let path = fs.createWriteStream("model" + model.productID + ".fbx");

            https.get(modelLink, (result) => {
                result.pipe(path);

                // after download completed close filestream
                path.on("finish", () => {
                    path.close();
                    res.status(200).json("Model Downloaded");
                });
            });
        })
        .catch(err => {
            res.status(406).json({ error: err.messages })
        })    
    }
    catch (error){
        console.log(error);
        res.status(406).json({ error: error.messages });
    }

}
const getImages = async (req, res) => {
    try{
        Images.find({ productID: { $in: req.body.productID } })
        .then(images => {
            for (let i = 0; i < images.length; i++) {
                let imageLink = images[i].imageLink
                let path = fs.createWriteStream("image" + i + ".png");
                https.get(imageLink, (result) => {
                    result.pipe(path);

                    // after download completed close filestream
                    path.on("finish", () => {
                        path.close();
                    });
                });
            }
            res.status(200).json("Images Downloaded");
        })
        .catch(err => {
            res.status(406).json({ error: err.messages })
        })
    }
    catch(error){
        console.log(error);
        res.status(406).json({ error: error.messages });
    }

}
const updateProduct = (req, res) => {
     Product.findOneAndUpdate(
        { productID: req.body.id },
        {
            $set: {
                productName: req.body.name,
                productPrice: req.body.price,
                categoryID: req.body.category,

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

const updateModel = (req, res) => {
    Model.findOneAndUpdate(
        { productID: req.body.id },
        {
            $set: {
                modelLink: req.body.modelLink,
              

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

const updateImage = (req, res) => {
    Images.findOneAndUpdate(
        { productID: req.body.id },
        {
            $set: {
                imageLink: req.body.imageLink,
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

const deleteProduct = (req,res)=>{
    Product.deleteOne({_id: req.body.id})
    .then(() => res.json({ message: "product Deleted " }))
       .catch((err) => res.send(err));
  }


module.exports = { logout, getSellers, login, getImages, getModel, addProduct,deleteProduct,updateImage,updateModel,updateProduct };


