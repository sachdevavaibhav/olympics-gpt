export const generateResponse = (req, res, resObject) => {
    return {
        request: {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            query: req.body.query?req.body.query: undefined,
        },
        response: resObject 
    }
}