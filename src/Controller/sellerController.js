// #Task route solution
const sellerModel = require('../Models/seller');
const Model = require('../Models/models')
const Images = require('../Models/images')
const Product = require('../Models/Product')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const app = require('../config/firebaseConfig');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { log } = require('console');
const Order = require('../Models/order');



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

const getSellers = async (req, res) => {
    const sellers = await sellerModel.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(sellers)
}

const updateProfile = async (req, res) => {
    try {
        const id = req.body._id;
        const result = await sellerModel.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(200).json(result);

    } catch (err) {
        res.status(400).send({ err: "Seller Not Found" });
    }
};



const getProducts = async (req, res) => {
    // DONE FOR MAGED Mo2aqatan
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (err) {
        res.status(406).json({ "error": err.message })
    }
}

const getProductss = async (req, res) => {
    try {
        const products = await Product.find({ sellerEmail: req.params.sellerEmail });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(406).json({ "error": err.message })
    }
}

const getModel = async (req, res) => {
    try {
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
    catch (error) {
        console.log(error);
        res.status(406).json({ error: error.messages });
    }

}
const getImages = async (req, res) => {
    try {
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
    catch (error) {
        console.log(error);
        res.status(406).json({ error: error.messages });
    }

}
const getOrders = async (req, res) => {
    try {
        // let seller = jwt.verify(req.cookies.jwt, 'secret')
        // let sellerEmail=seller.email
        let sellerEmail = req.params.sellerEmail
        const orders = await Order.find({});
        let sellerOrders = []
        orders.forEach((order) => {
            order.items.every((item) => {
                if (item.sellerEmail == sellerEmail) {
                    sellerOrders.push(order)
                    return false;
                }
            })
        })
        res.status(200).json(sellerOrders);
    }
    catch (err) {
        res.status(406).json({ "error": err.message })
    }
}

const addProduct = async (req, res) => {
    // Pass data as form-data not in JSON
    try {


        const files = req.files;
        let modelFile;
        const images = [];

        files.forEach(file => {
            if (file.fieldname === 'model') {
                modelFile = file;
            }
            else {
                images.push(file);
            }
        });

        const product = req.body;
        const storage = getStorage(app);

        const imagesPromise = images.map(async (image) => {

            const storageRef = ref(storage, `${image.originalname}`);
            const metaData = {
                contentType: image.mimetype
            }
            const snapshot = await uploadBytes(storageRef, image.buffer, metaData);
            const URL = await getDownloadURL(snapshot.ref);
            return URL;
        });
        const imagesURLS = await Promise.all(imagesPromise);
        product.images = imagesURLS;

        const storageRef = ref(storage, `${modelFile.originalname}`);
        const snapshot = await uploadBytes(storageRef, modelFile.buffer);
        const modelURL = await getDownloadURL(snapshot.ref);



        product.model = modelURL;

        const createdProduct = await Product.create(product);
        res.status(200).send(createdProduct);

    } catch (err) {
        console.log(err);
        res.status(406).json({ error: err.message });
    }
}


const updateModel = async (req, res) => {

    // add the model to firebaseStorage
    try {
        const productId = req.params.id;
        const model = req.file;
        const storage = getStorage(app);
        const storageRef = ref(storage, `Product${productId}/${model.originalname}`);
        const snapshot = await uploadBytes(storageRef, model.buffer);
        const modelURL = await getDownloadURL(snapshot.ref);
        // update link in mongo
        try {
            const doc = await Product.findOneAndUpdate(
                productId,
                { model: modelURL },
                { new: true });
            res.status(200).send(doc);

        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }

};

const updateProduct = (req, res) => {
    try {
        Product.findOneAndUpdate(
            { productID: req.body.id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,

                },
            },
            { new: true },
            (err, doc) => {
                if (err) {
                    res.status(406).json({ error: err.message });
                }
                else
                    res.status(200).json(doc);
            }

        );
    } catch (err) {
        res.send({ error: err.message })
    }

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
                res.status(406).json({ error: err.messages });
            }
            else
                res.status(200).json(doc);
        }

    );
};

const deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.body.id })
        .then(() => res.json({ message: "product Deleted " }))
        .catch((err) => res.send(err));
}


module.exports = { logout, getSellers, login, getOrders, updateProfile, getProductss, getImages, getModel, addProduct, deleteProduct, getProducts, updateImage, updateModel, updateProduct };


