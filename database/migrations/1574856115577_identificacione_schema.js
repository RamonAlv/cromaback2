'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdentificacioneSchema extends Schema {
  up () {
    this.create('identificaciones', (table) => {
      table.increments()
//Pendiente
      table.integer('user_id').unsigned().references('id').inTable('users')//Modifico
      table.integer('muestra_id').unsigned().references('id').inTable('muestras')
      table.boolean('p_ind_oxg').notNullable().defaultTo(false)//Quitar los default
      table.boolean('p_ind_mat_org').notNullable().defaultTo(false)
      table.boolean('p_ind_trans_sist').notNullable().defaultTo(false)
      table.boolean('p_ind_n_elem').notNullable().defaultTo(false)
      table.boolean('p_ind_romp').notNullable().defaultTo(false)
      table.boolean('p_ind_mat_viva').notNullable().defaultTo(false)
      table.boolean('p_ind_bio').notNullable().defaultTo(false)
      table.boolean('p_ind_pro_n').notNullable().defaultTo(false)
      table.boolean('c_ind_oxg').notNullable().defaultTo(false)
      table.boolean('c_ind_mat_org').notNullable().defaultTo(false)
      table.boolean('c_ind_trans_sist').notNullable().defaultTo(false)
      table.boolean('c_ind_n_elem').notNullable().defaultTo(false)
      table.boolean('c_ind_romp').notNullable().defaultTo(false)
      table.boolean('c_ind_mat_viva').notNullable().defaultTo(false)
      table.boolean('c_ind_bio').notNullable().defaultTo(false)
      table.boolean('c_ind_pro_n').notNullable().defaultTo(false)
      
      table.timestamps()
    })
  }

  down () {
    this.drop('identificaciones')
  }
}

module.exports = IdentificacioneSchema
