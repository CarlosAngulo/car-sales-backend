const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const User = require('./user.model');

const reportSchema = mongoose.Schema(
  {
    client: {
      type: String,
      trim: true,
      required: true,
    },
    paid: {
      type: Number,
      default: 0
    },
    positive: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    picture: {
      type: Boolean,
      default: false,
    },
    submitted: {
      type: Date,
    },
    platform: {
      type: String,
    },
    salesPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    active: {
        type: Boolean,
        default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reportSchema.plugin(toJSON);
reportSchema.plugin(paginate);

/**
 * @typedef Report
 */
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
