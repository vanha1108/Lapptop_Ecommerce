const getAccessToken = require("./getAccessToken")
const sgMail = require("./sgMail")
const validSignUpRequest = require("./validSignUpRequest")
const generateSignUpEmail = require("./generateSignUpEmail")
const generateCheckoutEmail = require("./generateCheckoutEmail")
const generateForgotPasswordEmail = require("./generateForgotPasswordEmail")
const validation = require("./validation")

module.exports = {
    getAccessToken,
    sgMail,
    validSignUpRequest,
    generateSignUpEmail,
    validation,
    generateCheckoutEmail,
    generateForgotPasswordEmail
}
