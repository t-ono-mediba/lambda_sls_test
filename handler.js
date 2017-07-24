'use strict';

const QuakeDispatcher = require('./src/QuakeDispatcher');

/**
 * 
 */
module.exports.dispose = (event, context, callback) => {


    console.log(event);
    callback(null, 'Hello from dispose');
};

/**
 * 
 */
module.exports.regist = (event, context, callback) => {
    callback(null, 'Hello from regist');
};