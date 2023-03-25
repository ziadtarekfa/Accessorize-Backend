const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "dx55omd7s", 
    api_key: "793911538675136", 
    api_secret: "S4lTBrQscpC63gUtGbbkstD21bw"
  });

  module.exports= cloudinary;