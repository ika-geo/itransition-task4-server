const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    myId: { type: String, required: true},
    role: { type: String, enum: ['Admin', 'User'], required: true },
    status: { type: String, enum: ['Active', 'Blocked'], default: 'Active' },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
