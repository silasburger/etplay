const express = require('express');
const router = new express.Router();
const { authenticateUser } = require('../middleware/authenticateUser');

const OTW = require('../models/OTW');

/**
 * Route handler for GET to /otw => return players that are on the way to the court (array)
 */
router.get('/', authenticateUser, async function(req, res, next) {
  try {
    let response = await OTW.getOTWs();
    return res.json({'otw': response});
  } catch (err) {
    next(err);
  }
});

/**
 * Route handler for GET to /otw/:id => return player that is on the way to the court 
 */
router.get('/:id', authenticateUser, async function(req, res, next) {
  try {
    let _id = req.params.id;
    let response = await OTW.getOTW(_id);
    return res.json({otw: response});
  } catch (err) {
    next(err);
  }
});

/**
 * Route handler for GET to /otw/count => returns number of players at the court
 */

router.get('/count', authenticateUser, async function(req, res, next) {
  try {
    let OTWCount = await OTW.countOTW();
    return res.json({ count: OTWCount });
  } catch (err) {
    next(err);
  }
});

/**
 * Route handler for DELETE to /otw/:id => removes players that are on the way to court
 */
router.delete('/:id', authenticateUser, async function(req, res, next) {
  try {
    let _id = req.params.id;
    await OTW.removeOTW(_id);
    return res.json({
      message: 'Success',
      otwEmail: req.email,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;