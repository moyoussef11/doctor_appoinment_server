const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const uploadImage = async (pathImg) => {
  try {
    const data = await cloudinary.uploader.upload(pathImg, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    console.log(error + "from utils cloudinary");
  }
};


const destroyImage = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    console.log(error + "from utils cloudinary");
  }
};

module.exports = { uploadImage, destroyImage };
