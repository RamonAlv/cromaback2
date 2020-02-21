'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CromaNnSchema extends Schema {
  up () {
    this.create('croma_nns', (table) => {
      table.increments()
      
      table.integer('user_id').unsigned().references('id').inTable('users')//creador
      table.integer('muestra_id').unsigned().references('id').inTable('muestras')
      table.boolean('ind_oxg').notNullable().defaultTo(false)//oxigeno
      table.boolean('ind_mat_org').notNullable().defaultTo(false)//humus
      table.boolean('ind_trans_sist').notNullable().defaultTo(false)//transformacion en las sustancias
      table.boolean('ind_n_elem').notNullable().defaultTo(false)//nitrogeno enlazado
      table.boolean('ind_romp').notNullable().defaultTo(false)//rompimiento
      table.boolean('ind_mat_viva').notNullable().defaultTo(false)//materia viva
      table.boolean('ind_bio').notNullable().defaultTo(false)//actividad biologica
      table.boolean('ind_pro_n').notNullable().defaultTo(false)//proteinas y nitrogeno organico
      table.boolean('veri').notNullable().defaultTo(false)
      table.boolean('eliminado').notNullable().defaultTo(false)
      table.string('img', 254).nullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('croma_nns')
  }
}

module.exports = CromaNnSchema
