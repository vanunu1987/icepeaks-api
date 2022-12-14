const express = require('express');

const campaign = require('../controllers/campaign');

const routes  = express.Router({ mergeParams: true });


routes.route('/')
  .get(campaign.list)
  .post(campaign.create)
  .put(campaign.update)

routes.route('/role')
  .get(campaign.role)
  
routes.route('/auto-complate')
  .get(campaign.search)
  
routes.route('/:id')
  .get(campaign.read)

routes.route('/:ids')
  .delete(campaign.delete);



module.exports = routes;