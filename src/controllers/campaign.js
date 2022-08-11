const mongoose = require('mongoose');
const response = require('../helpers/response');
const request = require('../helpers/request');
const pagination = require('../helpers/pagination');
const { createDocs } = require('../helpers/createCampaign')
const QRCode = require('qrcode')

const Campaign = mongoose.model('Campaign');

exports.list = async (req, res) => {
  try {
    const campainList = await Campaign.find({});
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
    const campaign = await Campaign.findOneAndUpdate({ uuid: req.params.id }, {fulfilled: req.body.fulfilled});
    return response.sendOk(res, campaign)
  } catch(error) {
    return response.sendServerError(res)
  }
};

exports.delete = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndUpdate({ uuid: req.params.id }, {viewable: req.body.viewable});
    return response.sendOk(res, campaign)
  } catch(error) {
    return response.sendServerError(res)
  }
};