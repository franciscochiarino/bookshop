const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require('../config/config');


// Define storage configuration
const storage = new GridFsStorage({

    // MongoDB connection string
    url: config.db,

    // MongoDB options
    options: { useNewUrlParser: true, useUnifiedTopology: true },

    // File storage in DB
    file: (req, file) => {

        // Accept these formats
        const match = ["image/png", "image/jpeg"];

        // Check if the image is really an image
        if (match.indexOf(file.mimetype) === -1) {
            
            // Make sure we don't have duplicate names
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            // BucketName indicates that the file will be stored at covers.chunks and covers.files collections.
            bucketName: "covers",
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

// Initialize middleware -- .single() will store the single file in req.file
const uploadFile = multer({ storage: storage }).single("file");
// Promisify so it can be used with async
const uploadFilesMiddleware = util.promisify(uploadFile);
// Export
module.exports = uploadFilesMiddleware;
