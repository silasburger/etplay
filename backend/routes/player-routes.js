const express = require('express');
const router = new express.Router();
const { authenticateUser } = require('../middleware/authenticateUser');

const Player = require('../models/Player');

/**
 * Route handler for GET to /players => get players
 */
router.get('/', authenticateUser, async function(req, res, next) {
  try {
    let response = await Player.getPlayers();
    return res.json({ players: response });
  } catch (err) {
    next(err);
  }
});

/**
 * Route handler for GET to /players/:id => get player
 */
router.get('/:id', authenticateUser, async function(req, res, next) {
  try {
    let _id = req.params.id;
    let response = await Player.getPlayer(_id);
    return res.json({ player: response });
  } catch (err) {
    next(err);
  }
});

/**
 * Route handler for DELETE to /players => removes players that are on the way to court
 */
router.delete('/:id', authenticateUser, async function(req, res, next) {
  try {
    let _id = req.params.id;
    await Player.removePlayers(_id);
    return res.json({
      message: 'Success',
      playerEmail: req.email,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Route handler for GET to /players/count => returns number of players at the court
 */

router.get('/count', authenticateUser, async function(req, res, next) {
  try {
    let playerCount = await Player.countPlayers();
    return res.json({ count: playerCount });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
