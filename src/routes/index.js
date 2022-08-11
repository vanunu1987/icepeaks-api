const express = require('express');

const campaign = require('../controllers/campaign');

const routes  = express.Router({ mergeParams: true });


routes.route('/')
  .get(campaign.list)
  .post(campaign.create);

routes.route('/:id')
  .get(campaign.read)
  .put(campaign.update)
  .delete(campaign.delete);

module.exports = routes;