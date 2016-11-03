// Is this production
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = require('./webpack/builds')[env];
