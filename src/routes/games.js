require('../db/connection');
const express = require('express');
const router = express.Router();
const Game = require('../models/game'); 
const User = require('../models/user');

router.post('/saveGame', async(req,res) => {
   
    try{
        const owner = req.body.owner;
        const status = req.body.status;
        const deck = req.body.deck;
        const defusers = req.body.defusers;
        if(status === 'Won'){
            
            await Game.create({owner: owner,status: status,defusers:0, deck: []});
            const existingUser = await User.findOne({ username: owner });

        
            if (existingUser) {
                updatedUser = await User.findOneAndUpdate(
                    { username: owner }, 
                    { $inc: { total: 1 } }, 
                    { new: true } 
                );
            } else {
                
                updatedUser = await User.create({ username: owner, total: 1 });
            }
        }
        else{
            const findAndUpdateResult = await Game.findOneAndUpdate(
                { status: 'Playing' },
                { owner: owner, status: status, defusers: defusers, deck: deck },
                { upsert: true, new: true }
            );
    
            
        }
        
        
        return res.status(200).json({ message: 'Saved' });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getGames/:owner',async(req,res) => {

   
    
    const owner = req.params.owner;

   
    try{
        
        
        const allGames= await Game.find({owner:owner}).exec();
        const response = [];
        for(const game of allGames){
            g = {
                id: game.gameId,
                owner: game.owner,
                defusers: game.defusers,
                status: game.status,
                deck: game.deck,
                timestamp: game.createdAt
            }
            response.push(g);
        }
        return res.status(200).json(response);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/leaderboard',async(req,res) => {

   
    try{ 
        const allPlayers= await User.find().exec();
        const response = [];
        for(const p of allPlayers){
            r = {
                player: p.username,
                score: p.total
            }
            response.push(r);
        }
        return res.status(200).json(response);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;