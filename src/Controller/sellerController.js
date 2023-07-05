const Product = require('../Models/Product')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const app = require('../config/firebaseConfig');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const Order = require('../Models/order');
const Seller = require('../Models/Seller');
const userModel = require('../Models/User');



const maxAge = 3 * 24 * 60 * 60;
const createToken = (email) => {
    return jwt.sign({ email }, 'secret', {
        expiresIn: maxAge
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email: email });
    if (!seller) {
        return res.status(404).json({ error: "Seller not found !" });
    } else {
        try {
            const hashedPassword = await bcrypt.compare(password, seller.password);
            if (hashedPassword) {
                const token = createToken(seller.email);
                res.cookie('jwt', token, { httponly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ "token": token })
            } else {
                res.status(400).json({ error: "Incorrect password !" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}
const signUp = async (req, res) => {
    try {
        const sellerEntered = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(sellerEntered.password, salt);
        sellerEntered.password = hashedPassword;
        const seller = await Seller.create(sellerEntered);
        const token = createToken(seller.email);
        res.status(200).json(token);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

const logout = async (_req, res) => {
    try {
        res.clearCookie('jwt'); //remove the value from our cookie.
        res.status(200).json("you are logged out")
    } catch (error) {
        res.status(406).json({ error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const result = await Seller.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {

        const token = req.cookies.jwt;
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const result = await Seller.findOne({ email: payload.email });
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getProducts = async (req, res) => {
    const token = req.cookies.jwt;
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    try {
        const products = await Product.find({ sellerEmail: payload.email });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(406).json({ error: err.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const product = await Product.findById(req.params.id);
        if (product == null || product.sellerEmail !== payload.email) {
            throw Error("Product is not available");
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(406).json({ "error": error.message })
    }
}


const getUserByEmail = async (req, res) => {
    try {
        const emailInput = req.params['email'];
        const user = await userModel.findOne({ email: emailInput }) //descending order
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getOrders = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

        const orders = await Order.find({});
        orders.forEach((order) => {
            order.items = order.items.filter((item) => {
                return item.sellerEmail === payload.email;
            });
        })
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(406).json({ error: error.message })
    }
}
const getOrderById = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const order = await Order.findOne({ _id: req.params.id });
        order.items = order.items.filter((item) => {
            return item.sellerEmail === payload.email;
        });

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const addProduct = async (req, res) => {
    // Pass data as form-data not in JSON
    try {
        const token = req.cookies.jwt;
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

        req.body.sellerEmail = payload.email;
        // add Product to mongo and get ID
        const createdProduct = await Product.create(req.body);
        const productId = createdProduct._id.toString();

        // get files from request
        const files = req.files;
        let model;
        const images = [];
        files.forEach(file => {
            if (file.fieldname === 'model') {
                model = file;
            }
            else {
                images.push(file);
            }
        });

        // add images and model to firebase
        const imagesURLS = await Promise.all(getImagesURL(productId, images));
        const modelURL = await getModelURL(productId, model);

        // update Product in mongo
        const newProduct = await Product.findOneAndUpdate(
            { _id: productId },
            {
                $set: {
                    images: imagesURLS,
                    modelLink: modelURL
                }
            },
            { new: true });
        res.send(newProduct);

    } catch (error) {
        res.status(406).json({ error: error.message });
    }

}

const getImagesURL = (productId, images) => {
    const storage = getStorage(app);
    return imagesPromise = images.map(async (image) => {
        const imagesRef = ref(storage, `Products/Product${productId}/images/${image.originalname}`);
        const metaData = {
            contentType: image.mimetype
        }
        const snapshot = await uploadBytes(imagesRef, image.buffer, metaData);
        const URL = await getDownloadURL(snapshot.ref);
        return URL;
    });
}


const getModelURL = async (productId, model) => {
    try {
        const storage = getStorage(app);
        const modelRef = ref(storage, `Products/Product${productId}/${model.originalname}`);
        const snapshot = await uploadBytes(modelRef, model.buffer);
        const modelURL = await getDownloadURL(snapshot.ref);
        return modelURL;
    }
    catch (err) {
        return err.message;
    }
}

const updateModel = async (req, res) => {

    // add the model to firebaseStorage
    try {
        const productId = req.params.id;
        const model = req.files[0];
        const modelURL = await getModelURL(productId, model);
        res.status(200).json(modelURL);

    } catch (err) {
        res.status(404).json({ error: err.message });
    }

};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};


const deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.body.id })
        .then(() => res.json({ message: "product Deleted " }))
        .catch((err) => res.send(err));
}


module.exports = {
    logout, login, signUp, getProductById,
    getOrders, getOrderById, updateProfile, addProduct,
    deleteProduct, getProducts, updateModel, updateProduct,
    getProfile, getUserByEmail
};


