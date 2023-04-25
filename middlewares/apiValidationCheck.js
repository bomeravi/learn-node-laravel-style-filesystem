import { validationResult} from "express-validator";

const apiValidationCheck =  (req, res, next) => {

    const result = validationResult(req);
    //console.log(result)
    let errors = result.errors;
    if (!result.isEmpty()) {
        let customErrors = {};
        errors.forEach(p => {
            if (keyExists(p.param, customErrors)) {
                customErrors[p.param].push(p.msg)
            } else {
                customErrors[p.param] = []
                customErrors[p.param].push(p.msg)
            }
        })
        return res.json({success: false, message: 'Validation failed.', errors: customErrors})
    }
    else{
        next()
     }

}
export default  apiValidationCheck

function keyExists(key, search) {
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }
    for (var i = 0; i < search.length; i++) {
        if (search[i] === key) {
            return true;
        }
    }
    return key in search;
}
