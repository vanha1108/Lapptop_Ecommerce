const password = (str) =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W\s\_]).{8,}$/.test(str)

const phone = (str) =>
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(str)

module.exports = {
    password,
    phone,
}
