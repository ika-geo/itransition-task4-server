module.exports = function userDto (user){
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    };
}