'use strict';

const _ = require('lodash');

const config = require('./config');

const mongoose = require('mongoose');

const schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

const schema = _.merge({}, require('mongopot/schemas/person'));

if (config.languages) {
  const description = schema.description;
  schema.description = {};
  _.forEach(config.languages, (value) => {
    schema.description[value.iso] = description;
  });
}

const EmployeeSchema = new mongoose.Schema(schema, schemaOptions);

EmployeeSchema.plugin(require('mongopot/plugins/base'));

EmployeeSchema.virtual('name').get(function () {
  return `${this.givenName} ${this.familyName}`;
});

module.exports = mongoose.model('Employee', EmployeeSchema);
