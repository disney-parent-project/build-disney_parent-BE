exports.up = function(knex) {
  return (
    knex.schema
      // ********** PARENTS **********
      .createTable("parents", parent => {
        parent.increments();

        parent
          .string("username", 128)
          .notNullable()
          .unique();

        parent.string("password").notNullable;
      })
      // ********** ORGANIZATIONS **********
      .createTable("organizations", org => {
        org.increments();

        org
          .string("orgName", 128)
          .notNullable()
          .unique();

        org.string("password").notNullable();
      })
      // ********** REQUESTS **********
      .createTable("requests", req => {
        req.increments();

        req
          .integer("parents_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("parents")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        req.time("atTime").notNullable();

        req.integer("num_kids").notNullable();

        req.string("atLocation").notNullable();
      })
      // ********** RESPONSES **********
      .createTable("responses", res => {
        res.increments();

        res
          .integer("parents_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("parents")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        res
          .integer("org_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("organizations")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        res
          .integer("requests_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("requests")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        res.string("message", 128);
      })
      // ********** QUESTIONS **********
      .createTable("questions", question => {
        question.increments();

        question
          .integer("parents_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("parents")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        question
          .integer("org_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("organizations")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        question
          .integer("requests_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("requests")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        question.string("message", 128).notNullable();
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("parents")
    .dropTableIfExists("organizations")
    .dropTableIfExists("requests")
    .dropTableIfExists("responses")
    .dropTableIfExists("questions");
};
