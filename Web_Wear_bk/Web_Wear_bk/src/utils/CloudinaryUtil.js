const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: "dn90oyhdw",
        api_key: "574331687775745",
        api_secret: "Q1PSkJznwsv7H2xVB1X4TXmi5V8"
    });
module.exports = cloudinary;


const UploadFileToCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error("No file found");
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(filePath);
        return cloudinaryResponse;
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: err.message,
        };
    }
};

module.exports = {
    UploadFileToCloudinary
};
