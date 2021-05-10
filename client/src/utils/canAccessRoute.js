const canAccessRoute = (userRoles, componentRoles) => {
    if (!Array.isArray(userRoles)) {
        return false
    }
    if (Array.isArray(componentRoles)) {
        const intersects = userRoles.filter((i) => componentRoles.includes(i))
        return intersects.length > 0
    }
    return true
}
export default canAccessRoute
