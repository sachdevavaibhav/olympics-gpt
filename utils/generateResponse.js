export const generateResponse = (req, res, resObject) => {
    return {
        request: {
            method: req.method,
            url: req.url,
            status: res.statusCode,
        },
        response: resObject 
    }
}