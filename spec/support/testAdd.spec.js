import { add } from "./add.js";
describe("A suite is just a function", function () {
  let a;

  it("and so is a spec", function () {
    a = true;
    var s = add(2, 3);

    expect(s).toBe(5);
  });
});
