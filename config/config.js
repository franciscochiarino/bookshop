const {env} = process;
const dotenv = require('dotenv');
dotenv.config();

const config = {
    env: env.NODE_ENV || 'development'
};

const devConfig = {
    db: env.MONGO_LOCAL,
    jwt_key: env.JWT_KEY
}

const prodConfig = {
    db: env.MONGO_PROD,
    jwt_key: env.JWT_KEY
}

const currentConfig = (config.env === 'production') ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig);