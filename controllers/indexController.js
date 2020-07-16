const path = require('path');

exports.getHomepage = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
};