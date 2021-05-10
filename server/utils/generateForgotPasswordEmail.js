const genarateForgotPassword = (email, code) => {
    return {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: process.env.FORGOT_PASSWORD_SUBJECT,
        text: `Your confirmation code is ${code}`,
        html: `<h5>Your confirmation code is ${code}.Submit your code with new password in app to cotinue. This code is expired after 15 mins</h5>`,
    }
}

module.exports = genarateForgotPassword
