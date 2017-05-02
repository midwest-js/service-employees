'use strict';

const _ = require('lodash');
const rest = require('midwest/factories/rest');
const formatQuery = require('midwest/factories/format-query');
const paginate = require('midwest/factories/paginate');
const resolveCache = require('./resolve-cache');

module.exports = _.memoize((config) => {
  const handlers = require('./handlers')(config);

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

  return Object.assign({}, mw, {
    create,
    formatQuery: formatQuery(['page', 'limit', 'sort']),
    paginate: paginate(handlers.count, 20),
  });
}, resolveCache());
