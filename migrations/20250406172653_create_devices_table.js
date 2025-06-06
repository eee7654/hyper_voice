// Auto-generated by sqlToKnex
exports.up = function(knex) {
  return knex.schema.createTable('devices', function(table) {
    table.increments('id').unsigned().notNullable();
    table.string('device_name', 45).notNullable();
    table.string('last_ip', 15).notNullable();
    table.string('alarm_file', 45).defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.integer('is_deleted').defaultTo('0');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices');
};
