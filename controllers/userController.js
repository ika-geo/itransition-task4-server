const User = require('../models/User');
const getUsersDto = require('../dtos/getUsersDto')

const getUsers = async (req, res) => {
    res.status(200).json({message: 'users'});
    // try {
    //     const users = await User.find();
    //     let usersResult = []
    //     users.map(user =>{
    //         usersResult.push(getUsersDto(user))
    //     })
    //     res.status(200).json(usersResult);
    // } catch (error) {
    //     res.status(500).json({ error: error.message, message: 'Failed to fetch users' });
    // }
};

const blockUsers = async (req, res) => {
    const { userIds } = req.body;
    console.log(userIds)
    try {
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'No user IDs provided' });
        }
        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { status: 'Blocked' } }
        );

        res.json({ message: `${result.modifiedCount} users blocked successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to block users' });
    }
};

const unblockUsers = async (req, res) => {
    const { userIds } = req.body;

    try {
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'No user IDs provided' });
        }
        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { status: 'Active' } }
        );
        res.status(200).json({ message: `${result.modifiedCount} users unblocked successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to unblock users' });
    }
};

const selfBlock = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ error: 'No user ID provided' });
        }
        await User.findByIdAndUpdate(id, { status: 'Blocked' });
        res.status(200).json({ message: 'Blocked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to unblock users' });
    }
}

const deleteUsers = async (req, res) => {
    const { userIds } = req.body;

    try {
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'No user IDs provided' });
        }

        const result = await User.deleteMany({ _id: { $in: userIds } });

        res.json({ message: `${result.deletedCount} users deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to delete users' });
    }
};

const deleteUserAsUser = async (req, res) => {
    const userId = req.body.id;
    console.log(userId)
    try {
        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to delete user' });
    }
};

module.exports = {
    getUsers,
    blockUsers,
    unblockUsers,
    selfBlock,
    deleteUsers,
    deleteUserAsUser
};
