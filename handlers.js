'use strict';

// modules > midwest
const factory = require('midwest/factories/handlers');

const columns = ['id', 'givenName', 'familyName', 'telephone', 'email', 'jobTitle', 'image', 'dateCreated', 'createdById', 'dateModified'];

const handlers = factory({
  table: 'employees',
  columns,
});

module.exports = handlers;
