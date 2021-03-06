const db = require("../database/dbConfig.js");
const Parents = require("./parents.js");

describe("parents.js", () => {
  // ********** add() **********
  describe("add()", () => {
    beforeEach(async () => {
      await db("parents").truncate();
      await db("organizations").truncate();
    });

    it("Add new parent to 'parents' database", async () => {
      await Parents.add({ username: "logan", password: "loganPass" });

      const parents = await db("parents");
      expect(parents).toHaveLength(1);
    });

    it("Return new Parent without PASSWORD", async () => {
      const parent = await Parents.add({
        username: "logan",
        password: "loganPass"
      });

      expect(parent).toEqual({
        id: 1,
        username: "logan"
      });
    });

    it("Null if missing password", async () => {
      const parent = await Parents.add({ username: "logan" });

      expect(parent).toBeNull();
    });

    it('Add to "organizations" database if "orgName" is used instead of "username"', async () => {
      await Parents.add({ orgName: "business", password: "busiPass" });

      const org = await db("organizations");
      expect(org).toHaveLength(1);
    });
  });

  // ********** findBy() **********
  describe("findBy()", () => {
    beforeEach(async () => {
      await db("parents").truncate();
      await db("organizations").truncate();
    });
    it("Return based on username or orgName", async () => {
      await db("parents").insert({ username: "logan", password: "logan" });
      await db("organizations").insert({
        orgName: "business",
        password: "pass"
      });

      const parent = await Parents.findBy("logan", "username");
      const organization = await Parents.findBy("business", "orgName");
      expect(parent).toEqual({ id: 1, username: "logan", password: "logan" });
      expect(organization).toEqual({
        id: 1,
        orgName: "business",
        password: "pass"
      });
    });
  });

  // ********** findById() **********
  describe("findById()", () => {
    beforeEach(async () => {
      await db("parents").truncate();
      await db("organizations").truncate();
    });

    it("Return a parent based on id", async () => {
      await db("parents").insert({ username: "logan", password: "logan" });

      const { id } = { id: 1 };
      const parent = await Parents.findById(id, "parents");
      expect(parent).toEqual({ id: 1, username: "logan" });
    });

    it("Return an organization based on id", async () => {
      await db("organizations").insert({
        orgName: "business",
        password: "pass"
      });

      const { id } = { id: 1 };
      const organization = await Parents.findById(id, "organizations");
      expect(organization).toEqual({ id: 1, orgName: "business" });
    });
  });
});
