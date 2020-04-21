
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
      t.increments('id').unsigned().primary();
      t.string('username').notNullable().unique();
      t.string('password').notNullable();
  }).createTable('sessions', s => {
    s.increments('id').unsigned().primary();
    s.string('ssid').notNullable().unique();
    s.int('ttl').notNullable();
    s.int('start').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('sessions');
};
