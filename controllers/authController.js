const bcrypt = require('bcryptjs');
const User = require('../models/User');
const userDto = require("../dtos/userDto");

exports.register = async (req, res) => {
    let { name, email, password, role } = req.body;
    if(!name || !email || !password || !role) {
        res.status(400).json({ error: 'no all necessary data'});
        process.exit(1)
    }
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        let myId = await bcrypt.hash(email, salt);
        user = new User({ name, email, password, role, myId });
        user.lastLogin = Date.now();
        let newUser = await user.save();
        let result = userDto(newUser)
        res.status(201).json({...result});
    } catch (error) {
        res.status(500).json({ error: error, message: 'Some error, please try again later' });
    }
};

exports.login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        if (user.status === 'Blocked') {
            return res.status(403).json({ message: 'Your account is blocked' });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const result = userDto(user)
        res.json({ ...result });
        user.lastLogin = Date.now();
        await user.save();
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Some error, please try again later' });
    }

};
