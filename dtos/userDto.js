module.exports = function userDto (user){
    return {
        id: user._id,
        myId: user.myId,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    };
}