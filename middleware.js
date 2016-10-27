'use strict';

const rest = require('midwest/middleware/rest');

const mw = {
  formatQuery: require('midwest/middleware/format-query'),
  paginate: require('midwest/middleware/paginate'),
};

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
  formatQuery: mw.formatQuery(['page', 'limit', 'sort']),
  paginate: mw.paginate(Employee, 10),
});
