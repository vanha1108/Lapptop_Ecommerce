const jwt = require("jsonwebtoken")
const passwordHash = require("password-hash")
const shortid = require("shortid")

const {
    validSignUpRequest,
    sgMail,
    generateSignUpEmail,
    generateForgotPasswordEmail,
    validation,
} = require("../utils")

const { User } = require("../models")

const logIn = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("Wrong email or password")

    const passed = passwordHash.verify(password, user.password)
    if (!passed) throw new Error("Wrong email or password")

    const data = {
        _id: user._id,
        email: user.email,
        roles: user.roles,
    }

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE,
    })

    return { data, accessToken }
}

const logInMobile = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("Wrong email or password")

    if (!user.roles.includes("Guest")) throw new Error("Forbidden")

    const passed = passwordHash.verify(password, user.password)
    if (!passed) throw new Error("Wrong email or password")

    const data = {
        _id: user._id,
        email: user.email,
        roles: user.roles,
        name: user.name
    }

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE,
    })

    return { data, accessToken }
}

const getInfo = async (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET_KEY)

    const user = await User.findOne({ _id: userInfo._id })
    if (!user) throw new Error("User doesn't exist")

    return {
        _id: userInfo._id,
        email: userInfo.email,
        roles: user.roles,
        name: user.name
    }
}

let pendingSignUpRequests = []
const signUp = async ({ name, email, address, phone, password }) => {
    const duplicateRecord = await User.findOne({ email })
    if (!!duplicateRecord) throw new Error("Duplicate user email")
    if (!validation.phone(phone)) throw new Error("Invalid phone number")
    if (!validation.password(password)) throw new Error("Invalid password")

    const time = new Date().getTime()
    const newPendingSignUpRequest = {
        _id: shortid.generate(),
        time,
        data: {
            name,
            email,
            address,
            phone,
            password: passwordHash.generate(password),
        },
    }
    pendingSignUpRequests = pendingSignUpRequests.filter(
        (request) => request.data.email !== email,
    )
    pendingSignUpRequests.push(newPendingSignUpRequest)
    await sgMail.send(generateSignUpEmail(email, newPendingSignUpRequest._id))
}

const confirmSignUp = async (pendingSignUpRequestId) => {
    pendingSignUpRequests = pendingSignUpRequests.filter((request) =>
        validSignUpRequest(request),
    )

    const pendingSignUpRequest = pendingSignUpRequests.find(
        (request) => request._id === pendingSignUpRequestId,
    )
    if (!pendingSignUpRequest) throw new Error("Invalid request")
    const newUser = new User({
        ...pendingSignUpRequest.data,
        roles: ["Guest"],
    })

    await newUser.save()

    pendingSignUpRequests = pendingSignUpRequests.filter(
        (request) => request._id !== pendingSignUpRequestId,
    )
}

let pendingForgotPasswordRequests = []
const forgotPassword = async (email) => {
    const user = await User.findOne({ email })
    if (!!user) {
        const token = shortid.generate()
        const now = new Date().getTime()
        pendingForgotPasswordRequests = pendingForgotPasswordRequests.filter(item => item.email !== email)
        pendingForgotPasswordRequests.push({
            email,
            time: now,
            token
        })
        await sgMail.send(generateForgotPasswordEmail(email, token))
    }
}

const confirmForgotPassword = async ({ token, newPassword }) => {
    pendingForgotPasswordRequests = pendingForgotPasswordRequests.filter((request) =>
        validSignUpRequest(request),
    )

    const pendingForgotPasswordRequest = pendingForgotPasswordRequests.find(
        (request) => request.token === token,
    )
    if (!pendingForgotPasswordRequest) throw new Error("Invalid request")
    if (!validation.password(newPassword)) throw new Error("Invalid password")

    const user = await User.findOne({ email: pendingForgotPasswordRequest.email })
    user.password = passwordHash.generate(newPassword)

    await user.save()
}

module.exports = {
    logIn,
    logInMobile,
    getInfo,
    signUp,
    confirmSignUp,
    forgotPassword,
    confirmForgotPassword
}
