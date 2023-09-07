const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const MongoURI = 'mongodb+srv://SixAnts:SixAnts_6@cluster0.ipncqd2.mongodb.net/test';

//App variables
const app = express();
const port = process.env.PORT || "8000";
const UserRoutes = require('./Routes/UserRoutes');
const SellerRoutes = require('./Routes/SellerRoutes');
const AdminRoutes = require('./Routes/AdminRoutes');


// configurations

//cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}

// Mongo DB
mongoose.connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!")
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    })
  })
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//importing routes 
app.use('/user', UserRoutes);
app.use('/seller', SellerRoutes);
app.use('/admin', AdminRoutes);





