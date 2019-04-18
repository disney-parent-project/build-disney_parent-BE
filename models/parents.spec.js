const db = require("../database/dbConfig.js");
const Parents = require("./parents.js");

describe("parents.js", () => {
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
});
