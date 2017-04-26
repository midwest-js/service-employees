'use strict';

// modules > midwest
const factory = require('midwest/factories/handlers');

const columns = [
  'id',
  'givenName',
  'familyName',
  'telephone',
  'email',
  'jobTitle',
  'description',
  'dateCreated',
  'createdById',
  'dateModified',
  'modifiedById',
];

const config = require('./config');

const handlers = factory({
  db: config.db,
  emitter: config.emitter,
  table: 'employees',
  columns,
});

module.exports = handlers;
