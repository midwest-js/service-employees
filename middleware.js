'use strict';

const rest = require('midwest/factories/rest');
const formatQuery = require('midwest/factories/format-query');
const paginate = require('midwest/factories/paginate');

const Employee = require('./model');

function getPublished(req, res, next) {
  Employee.find({ datePublished: { $ne: null } }, (err, employees) => {
    if (err) return next(err);

    res.locals.employees = employees;
    next();
  });
}

module.exports = Object.assign(rest(Employee), {
  getPublished,
  formatQuery: formatQuery(['page', 'limit', 'sort']),
  paginate: paginate(Employee, 10),
});
