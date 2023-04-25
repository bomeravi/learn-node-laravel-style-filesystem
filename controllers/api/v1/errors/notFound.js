const notFound =  ( req, res) => {
    let path = req.originalUrl;
    let method = req.method;

    return res.status(404).json({
        success: false,
        message: "Url not found",
        path:path,
        method:method

    })
}
 export default notFound
