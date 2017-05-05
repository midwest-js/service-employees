'use strict';

// modules > 3rd party
const _ = require('lodash');

// modules > midwest
const factory = require('midwest/factories/handlers');
const resolveCache = require('./resolve-cache');

const columns = [
  'id',
  'givenName',
  'familyName',
  'telephone',
  'email',
  'jobTitle',
  'description',
  'createdAt',
  'createdById',
  'modifiedAt',
  'modifiedById',
];

module.exports = _.memoize((config) => {
  const handlers = factory({
    db: config.db,
    emitter: config.emitter,
    table: 'employees',
    columns,
  });

  return handlers;
}, resolveCache);
