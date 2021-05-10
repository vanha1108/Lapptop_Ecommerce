const MILISECONDS_PER_MINUTE = 1000 * 60

const validSignUpRequest = (pendingSignUpRequest) => {
    try {
        const now = new Date().getTime()
        const diffMinutes =
            (now - pendingSignUpRequest.time) / MILISECONDS_PER_MINUTE
        return diffMinutes <= 15
    } catch (err) {
        return false
    }
}

module.exports = validSignUpRequest
