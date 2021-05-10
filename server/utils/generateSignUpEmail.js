const generateSignUpEmail = (email, code) => {
    return {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: process.env.SIGN_UP_SUBJECT,
        text: `Your sign up confirmation code is ${code}`,
        html: `<h5>Your sign up confirmation code is ${code}. This code is expired after 15 mins</h5>`,
    }
}

module.exports = generateSignUpEmail
