const mongoose = require('mongoose');

const allowedPropertyKeys = [
  'userProperties',
  'companyProperties',
  'meetingProperties',
];

const actionSchema = new mongoose.Schema({
  actionName: {
    type: String,
    required: true,
  },
  actionDate: {
    type: Date,
    required: true,
  },
  includeInAnalytics: {
    type: Boolean,
    default: false,
  },
  identity: {
    type: String,
    required: true,
  },
  properties: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function (v) {
        // Validate the properties map to ensure only one type of property is present
        const keys = Array.from(v.keys());
        return keys.length === 1 && allowedPropertyKeys.includes(keys[0]);
      },
      message: `Only one property field (${allowedPropertyKeys.join(
        ', '
      )}) is allowed.`,
    },
  },
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
