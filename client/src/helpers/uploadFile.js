const cloudinary = require('./cloudinaryConfig');

const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'eye_images', 
    });
    return result.secure_url; 
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
};

module.exports = uploadFile;

