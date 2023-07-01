const adminModel = require('../Models/Admin');
const Seller = require('../Models/Seller');
const userModel = require('../Models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'secret', {
        expiresIn: maxAge
    });
};

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = await adminModel.create({ name: name, email: email, password: hashedPassword });
        const token = createToken(admin.name);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const isLoggedIn = (req, res) => {
    try {
        if (!req.cookies.jwt) {
            res.status(401).send({ err: "You are not logged in" })
        }
        else {
            jwt.verify(req.cookies.jwt, 'secret', function (err, _decoded) {
                if (err) {
                    res.status(401).send({ err: err.message });
                }
                else {
                    res.status(200).send("Successfull");
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
        return res.status(404).json({ error: "Account does not exist !" });
    } else {
        try {
            const hashedPassword = await bcrypt.compare(password, admin.password);
            if (hashedPassword) {
                const token = createToken(admin.email);
                res.cookie('jwt', token, { httponly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ "token": token })
            } else {
                res.status(400).json({ error: "Incorrect password !" })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}
const logout = async (_req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json("you are logged out")
    } catch (error) {
        res.status(406).json({ error: error.message });
    }
}


const getSellers = async (_req, res) => {
    const sellers = await Seller.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(sellers)
}

const getSellerById = async (req, res) => {
    try {
        const id = req.params['id'];
        const seller = await Seller.findOne({ _id: id }) //descending order
        res.status(200).json(seller)
    } catch (err) {
        res.status(400).json({ err: "Seller Not Found" });
    }

}

const getUsers = async (_req, res) => {
    const users = await userModel.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(users)
}

const getUserById = async (req, res) => {
    try {
        const id = req.params['id'];
        const user = await userModel.findOne({ _id: id }) //descending order
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ err: "User Not Found" });
    }
}

const deleteUser = (req, res) => {
    if (req.body.email == null) {
        res.status(200).json("Please enter the user's email")
    }
    else {
        userModel.findOneAndDelete({ email: req.body.email })
            .then((user) => {
                if (user) res.status(200).json("User deleted")
                else res.status(400).json("User not found")
            })
            .catch((err) => res.status(400).send(err));
    }

}

const deleteSeller = (req, res) => {
    if (req.body.email == null) {
        res.status(200).json("Please enter the seller's email")
    }
    else {
        Seller.findOneAndDelete({ email: req.body.email })
            .then((seller) => {
                if (seller) res.status(200).json("Seller deleted")
                else res.status(400).json("Seller not found")
            })
            .catch((err) => res.status(400).send(err));
    }
}

const numberOfUsers = async (_req, res) => {
    try {
        let usersCount = await userModel.countDocuments({})
        res.status(200).json({ usersCount })
    }
    catch (error) {
        res.status(400).json(err)
    }
}

const numberOfSellers = async (_req, res) => {
    try {
        let sellersCount = await Seller.countDocuments({})
        res.status(200).json({ sellersCount })
    }
    catch (error) {
        res.status(400).json(err)
    }
}

const updateSeller = async (req, res) => {
    try {
        const id = req.body._id;
        const result = await Seller.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(200).json(result);

    } catch (err) {
        res.status(400).send({ err: "Seller Not Found" });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.body._id;
        const result = await userModel.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(200).json(result);

    } catch (err) {
        res.status(400).send({ err: "User Not Found" });
    }
};

const recentUsers = async (_req, res) => {
    try {
        let users = await userModel.find({ createdAt: { $gte: new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))) } });
        res.status(200).json(users.length)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const recentSellers = async (_req, res) => {
    try {
        let sellers = await Seller.find({ createdAt: { $gte: new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000))) } });
        res.status(200).json(sellers.length)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { login, logout, signUp, recentUsers, recentSellers, getSellers, getSellerById, getUsers, getUserById, deleteUser, deleteSeller, numberOfUsers, numberOfSellers, updateSeller, updateUser, isLoggedIn };