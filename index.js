'use strict'

const _ = require('lodash')
const resolver = require('deep-equal-resolver')()

module.exports = _.memoize((config) => ({
  router: require('./router')(config),
  middleware: require('./middleware')(config),
  handlers: require('./handlers')(config),
}), resolver)
