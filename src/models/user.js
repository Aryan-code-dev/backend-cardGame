const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
