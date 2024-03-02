const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const gameSchema = new mongoose.Schema({
    gameId: {
        type: String, 
        default: uuidv4, 
        required: true,
        unique: true,
    },
    owner: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    defusers: {
        type: Number,
        required: true

    },
    deck: {
        type: [String], 
        default: [],
        required: true
    }

}, {
    timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
