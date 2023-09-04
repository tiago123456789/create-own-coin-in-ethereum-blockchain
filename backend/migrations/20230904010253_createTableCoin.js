/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTableIfNotExists("coins", (table) => {
        table.bigIncrements("id").primary().index();
        table.string('name', 100).notNullable()
        table.string('symbol', 10).notNullable()
        table.string('owner', 100).notNullable()
        table.string("address", 100).notNullable();
        table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("coins");
};
