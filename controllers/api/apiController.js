const api = (req,res, next) => {
    res.json({status: true,message:'Please select api version' })
}

const v1 = (req,res, next) => {

    res.json({status: true,message:'V1 Api are here' })
}

export {api,v1}
