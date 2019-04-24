const fns = require("./fns.js");
const test = require("ava");

const STRING = "foo";
const NUMBER = 0.12;
const ARRAY = [0, 1, 2];
const OBJECT = { foo: "bar", baz: ["q", "u", "x"] };

class Base {
  constructor(n) {
    this.n = n;
  }

  square() {
    return this.n * this.n;
  }
}

class Derived extends Base {
  cube() {
    return this.square() * this.n;
  }
}

test("0", t => {
  let r = fns([String, Number, Array], function() { return 0; })(new String(STRING), new Number(NUMBER), new Array(...ARRAY));
  t.is(r, 0);
});

test("1", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(new Array(...ARRAY), new String(STRING), new Number(NUMBER));
  }, TypeError);
});

test("2", t => {
  let r = fns([String, Number, Array], function() { return 0; })(STRING, NUMBER, ARRAY);
  t.is(r, 0);
});

test("3", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(ARRAY, STRING, NUMBER);
  }, TypeError);
});

test("4", t => {
  let r = fns([String], function() { return 0; })(STRING);
  t.is(r, 0);
});

test("5", t => {
  t.throws(() => {
    fns([String], function() { return 0; })(ARRAY);
  }, TypeError);
});

test("6", t => {
  let r = fns([Object], function() { return 0; })(OBJECT);
  t.is(r, 0);
});

test("7", t => {
  let r = fns([Object], function() { return 0; })(ARRAY);
  t.is(r, 0);
});

test("8", t => {
  let r = fns([Base], function() { return 0; })(new Base(NUMBER));
  t.is(r, 0);
});

test("9", t => {
  let r = fns([Base], function() { return 0; })(new Derived(NUMBER));
  t.is(r, 0);
});

test("10", t => {
  let r = fns([Derived], function() { return 0; })(new Derived(NUMBER));
  t.is(r, 0);
});

test("11", t => {
  t.throws(() => {
    fns([Derived], function() { return 0; })(new Base(NUMBER));
  }, TypeError);
});
