'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaiseSchema extends Schema {
  up () {
    this.create('paises', (table) => {
      table.increments()
      table.string('nombre', 100).notNullable()
    })
  }

  down () {
    this.drop('paises')
  }
}

module.exports = PaiseSchema
