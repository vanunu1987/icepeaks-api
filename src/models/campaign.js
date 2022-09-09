const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
const CampaignSchema = new Schema({
  campaign_name: {
    type: String,
    required: true
  },
  create_by: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true 
  },
  fulfilled: {
    type: Boolean,
    required: true
  },
  viewable: {
    type: Boolean,
    required: true
  },
  created_at: {
    type: Date,
    required: true 
  },
  update_at: {
    type: Number,
    required: false
  },
  update_by: {
    type: String,
    required: false
  }
});

CampaignSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Campaign', CampaignSchema);