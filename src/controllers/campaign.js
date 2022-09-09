const mongoose = require('mongoose');
const response = require('../helpers/response');
const request = require('../helpers/request');
const pagination = require('../helpers/pagination');
const { createDocs } = require('../helpers/createCampaign')
const QRCode = require('qrcode')

const Campaign = mongoose.model('Campaign');

exports.list = async (req, res) => {
  try {
    const campainList = await Campaign.find({}).sort({campaign_name: 1, uuid: 1, update_at: -1});
    return response.sendOk(res, campainList)

  } catch (error) {
    return response.sendServerError(res)
  }
};

exports.create = async (req, res) => {
  try {
    const campaigns = createDocs(req.body)
    await Campaign.insertMany(campaigns);
    return response.sendCreated(res)
  } catch (error) {
    return response.sendServerError(res)
  }
};

exports.read = async (req, res)  => {
  try {
    const campaign = await Campaign.findOne({ uuid: req.params.id });
    const qr = await QRCode.toDataURL(campaign.uuid)
    console.log(qr)
    return response.sendOk(res, campaign)
  }catch (error) {
    return response.sendServerError(res)
  }
};

exports.update = async (req, res) => {
  try {
    const campaigns = [];
    const date = new Date().getTime();
    for (const dataToUpdate of req.body.updateData) {
      const campaign = await Campaign.findOneAndUpdate({ 
        uuid: dataToUpdate.uuid 
      }, {
        fulfilled: !dataToUpdate.fulfilled, 
        update_at: +date, 
        update_by: req.body.userName
      });
      campaigns.push(campaign);
    }
    return response.sendOk(res, campaigns)
  } catch(error) {
    return response.sendServerError(res)
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.ids) response.sendServerError(res)
    const date = new Date().getTime();
    const ids = req.params.ids.split(',')
    const campaign = await Campaign.updateMany({ 
      uuid: ids 
    }, {
      viewable: false,
      update_at: +date, 
      update_by: req.body.userName
    });
    return response.sendOk(res, campaign)
  } catch(error) {
    return response.sendServerError(res)
  }
};

exports.search = async (req, res) => {
  try {
    const { query } = req;
    const searchQuery = Object.entries(query).reduce((acc,[key, value]) => {
      acc[key] = new RegExp(value)
      return acc
    }, {})
    const campainList = await Campaign.find({...searchQuery});
    return response.sendOk(res, campainList)
  } catch(error) {
  }
}
