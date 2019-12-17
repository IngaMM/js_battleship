const Visualization = require("../src/Visualization");

let vis = new Visualization();

test("The drawField function returns the correct value", () => {
  let field = { ship: "", state: "" };
  expect(vis.drawField(field)).toBe("");
  field.ship = 3;
  expect(vis.drawField(field)).toBe("");
  field.state = "hit";
  expect(vis.drawField(field)).toBe("X");
  field.state = "miss";
  expect(vis.drawField(field)).toBe("O");
});
