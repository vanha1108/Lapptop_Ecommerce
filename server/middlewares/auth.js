const jwt = require("jsonwebtoken")

module.exports = roles => (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : ""

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        if (!userInfo.roles.some(role => roles.includes(role))) {
            throw new Error("Invalid request")
        }

        req.userId = userInfo._id
        next()
    } catch (err) {
        res.status(401).send(err.message)
    }
}