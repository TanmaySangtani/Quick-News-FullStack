const jwt = require('jsonwebtoken')

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and assign id to req object
    const token = req.cookies['auth-token'] //getting the token from cookies

    if (!token)
    {
        req.user = "!"
        next()
    }

    try 
    {
        const data = jwt.verify(token, process.env['JWT_SECRET'])
        req.user = data.user
        next()
    }
    catch(error)
    {
        req.user = "!"
        next()
    }
}

module.exports = fetchuser