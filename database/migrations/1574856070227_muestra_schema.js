'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MuestraSchema extends Schema {
  up () {
    this.create('muestras', (table) => {
      table.increments()

      table.integer('lote_id').unsigned().references('id').inTable('lotes')
      table.integer('localizacione_id').unsigned().references('id').inTable('localizaciones')

      table.string('profundidad', 50).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('muestras')
  }
}

module.exports = MuestraSchema
