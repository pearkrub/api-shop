'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = CustomException
