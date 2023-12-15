'use strict'

// Creating a logger to console.log each request path and method.

const logger = (req,res,next) => {
    console.log(`REQUEST: ${req.method} && PATH: ${req.path}`);
    next()
}

module.exports = logger;