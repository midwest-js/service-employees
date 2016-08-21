'use strict';

const _ = require('lodash');

const mw = {
  formatQuery: require('warepot/format-query'),
  paginate: require('warepot/paginate')
};

const mongoose = require('mongoose');

const Employee = require('./model');

function create(req, res, next) {
  Employee.create(req.body, function (err, employee) {
    if (err) return next(err);
    res.status(201).json(employee);
  });
}

function find(req, res, next) {
  const page = Math.max(0, req.query.page) || 0;
  const perPage = Math.max(0, req.query.limit) || res.locals.perPage;

  const query = Employee.find(_.omit(req.query, 'limit', 'sort', 'page'),
    null,
    { sort: req.query.sort || '-dateCreated', lean: true });

  if (perPage)
    query.limit(perPage).skip(perPage * page);

  query.exec(function (err, employees) {
    res.locals.employees = employees;
    next(err);
  });
}

function getAll(req, res, next) {
  if (!req.user)
    return getPublished(req, res, next);

  Employee.find({}, function (err, employees) {
    if (err) return next(err);

    res.locals.employees = employees;
    next();
  });
}

function getPublished(req, res, next) {
  Employee.find({ datePublished: { $ne: null } }, function (err, employees) {
    if (err) return next(err);

    res.locals.employees = employees;
    next();
  });
}


function findById(req, res, next) {
  if (req.params.id === 'new') return next();

  const query = {};

  query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

  Employee.findOne(query, function (err, employee) {
    if (err) return next(err);
    res.locals.employee = employee;
    next();
  });
}

function patch(req, res, next) {
  const query = {};

  query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

  Employee.findOne(query, function (err, employee) {
    delete req.body._id;
    delete req.body.__v;

    _.extend(employee, req.body);

    return employee.save(function (err) {
      if (err) return next(err);

      return res.status(200).json(employee);
    });
  });
}

function put(req, res, next) {
  const query = {};

  query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

  Employee.findOne(query, function (err, employee) {
    _.difference(_.keys(employee.toObject()), _.keys(req.body)).forEach(function (key) {
      employee[key] = undefined;
    });

    _.extend(employee, _.omit(req.body, '_id', '__v'));

    return employee.save(function (err) {
      if (err) return next(err);

      return res.status(200).json(employee);
    });
  });
}

function remove(req, res, next) {
  return Employee.findById(req.params.id, function (err, employee) {
    if (err) return next(err);
    return employee.remove(function (err) {
      if (err) return next(err);
      return res.sendStatus(200);
    });
  });
}

module.exports = {
  create,
  find,
  getAll,
  getPublished,
  findById,
  formatQuery: mw.formatQuery([ 'page', 'limit', 'sort' ]),
  paginate: mw.paginate(Employee, 10),
  patch,
  put,
  remove
};
