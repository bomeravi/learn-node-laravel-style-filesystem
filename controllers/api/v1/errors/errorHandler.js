import {NotFoundError, UnauthorizedError,DatabaseError,SessionExpiredError} from  "./errors.js";
const errorHandler =  (error, req, res, next) => {
    res.header("Content-Type", 'application/json')
    let errorCode = 500;
    let path = req.originalUrl;
    if (error) {
        console.log('Error: ', error.name);
        console.log('Error: ', error.message);
        //console.log('Error: ', error.message);
        //console.log('Error: ', error.message);
        //console.log('Error: ', error.message);
        //console.log('Error: ', error.message);
    }


    if(error instanceof NotFoundError){
        errorCode = error.httpStatusCode || 404

        return res.status(errorCode).json({
            status: false,
            message: 'File not found. Please try later.'
        })

    }
    else if(error instanceof UnauthorizedError){
        errorCode = error.httpStatusCode || 401

        return res.status(errorCode).json({
            success: false,
            message: 'Unauthorized. Please login to continue'
        })

    }
    else if(error instanceof SessionExpiredError){
        errorCode = error.httpStatusCode || 401

        return res.status(errorCode).json({
            success: false,
            message: error.message || 'Unauthorized. Please login to continue'
           // message: 'Unauthorized. Please login to continue'
        })

    }





    if(errorCode === 500){
        
        res.status(errorCode).json({
            status: false,
            message: 'Internal Server Error. Please try later.'

        })
    }
    else if (errorCode === 401) {

        res.status(errorCode).json({
            status: false,
            message: 'Unauthorized, Login to continue',

        })
    }
    else if (errorCode === 403) {

        res.status(errorCode).json({
            status: false,
            message: 'Unauthorized, You do not have permission to access it',

        })
    }
    else {

        res.status(errorCode).json({
            status: false,
            pageTitle: 'Page not found',
            path: path
        })
    }



}
export default errorHandler
