const campaign = require("../models/campaign");
const { v4: uuidv4 } = require('uuid');

exports.createDocs = ({campaignName, amount, createBy}) => [...Array(amount)]
    .map((_) => ({ 
        campaign_name: campaignName, 
        create_by: createBy, 
        uuid: uuidv4(),
        created_at: new Date(),
        fulfilled: false,
        viewable: true
     }))


