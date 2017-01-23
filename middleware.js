'use strict';

const rest = require('midwest/factories/rest');
const formatQuery = require('midwest/factories/format-query');
const paginate = require('midwest/factories/paginate');

const handlers = require('./handlers');

const mw = rest({
  plural: 'employees',
  handlers,
});

function create(req, res, next) {
  Object.assign(req.body, {
    createdById: req.user.id,
  });

  mw.create(req, res, next);
}

module.exports = Object.assign({}, mw, {
  create,
  formatQuery: formatQuery(['page', 'limit', 'sort']),
  paginate: paginate(handlers.count, 20),
});
