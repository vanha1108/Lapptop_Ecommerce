const remainGuarantee = (time, guaranteeDuration) => {
    const expireTime = time + guaranteeDuration
    const now = new Date().getTime()
    const remainTime = now - time

    return {
        expireTime,
        remainTime
    }
}

export default remainGuarantee