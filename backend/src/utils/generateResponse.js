export const generateResponse = (req, res, resObject) => {
    return {
        request: {
            method: req.method,
            url: req.url,
            query: req.body.query?req.body.query: undefined,
        },
        response: {
            status: res.statusCode,
            data: resObject
        } 
    }
}