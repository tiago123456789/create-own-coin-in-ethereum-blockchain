/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("requests", (table) => {
    table.bigIncrements("id").primary().index();
    table.string('owner_wallet_address', 100).notNullable()
    table.string('requester_wallet_address', 100).notNullable()
    table.integer('amount').notNullable()
    table.string("coin_contract_address").notNullable();
    table.string("coin_name", 100).notNullable();
    table.timestamps();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("requests");
};
