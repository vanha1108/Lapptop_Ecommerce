const generateCheckoutPaidEmail = (email, amount, info, orderId) => {
    return {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: process.env.CHECKOUT_SUBJECT,
        text: `You have checked out ${amount} USD successfully for ${info}`,
        html: `<h3>You have checked out ${amount} USD successfully for ${info}. Your order ID: ${orderId}</h3>`,
    }
}

const generateCheckoutCODEmail = (email, amount, info, orderId) => {
    return {
        from: process.env.SYSTEM_EMAIL,
        to: email,
        subject: process.env.COD_SUBJECT,
        text: `You have an order with ${amount} USD payment for ${info}`,
        html: `<h3>You have an order with ${amount} USD payment for ${info}. Your order ID: ${orderId}. Your product will be sent to you in 3-5 days</h3>`,
    }
}

module.exports = {
    generateCheckoutPaidEmail,
    generateCheckoutCODEmail
}
