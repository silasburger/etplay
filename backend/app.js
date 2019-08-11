'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./config');
const cron = require('node-cron');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

//Todo: SORT PLAYERS AT COURT/ PLAYERS OTW BY TIMESTAMP
//Todo: BREAK UP POST /PLAYERS => ABSTRACT SOME LOGIC OUT MAYBE
//Todo: MODIFY FRONTEND CHECKIN SO THAT IT WORKS WITH BACKEND POST PLAYERS

const mongoUtil = require('./db/mongoUtil');

/************* DATABASE CONNECTION **********************/
mongoUtil.connect(function(error) {
  // a standard Node.js "error-first" callback
  if (error) {
    // kill express if we cannot connect to the database server
    console.error(error);
    process.exit(1);
  }
  console.log('Successfully connected to database');
  const db = mongoUtil.get();

  /*************** ROUTES ******************************/
  const playerRoutes = require('./routes/player-routes');
  const otwRoutes = require('./routes/otw-routes');
  const authRoutes = require('./routes/user-routes');

  app.use('/players', playerRoutes);
  app.use('/otw', otwRoutes);
  app.use('/', authRoutes);

  /*************** CRON JOB ******************************/

  // Cron Job which clears players from court every 24 hours
  cron.schedule('* * */24 * * *', () => {
    db.collection('players').deleteMany({});
    console.log('Clearing players');
  });

  /************ GENERAL ERROR HANDLER *******************************/

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    return res.json({
      error: err
    });
  });

  /************* SERVER SET UP **********************/

  app.listen(PORT, function() {
    console.log(`Courtside Counter API Server listening on port ${PORT}.`);
  });
});

module.exports = app;
