'use strict'

// handling server errors 500

function handle500(err,req,res,next) {

    const error = err.message? error.message:err;

    res.status(500).json({
        status: 500,
        message:error
    })
}

module.exports = handle500;