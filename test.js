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

test("all match, too few arguments", t => {
  t.throws(() => {
    fns([String, Number, Array, String], function() { return 0; })(new String(STRING), new Number(NUMBER), new Array(...ARRAY));
  }, RangeError);
});

test("all match, too many arguments", t => {
  t.throws(() => {
    fns([String, Number], function() { return 0; })(new String(STRING), new Number(NUMBER), new Array(...ARRAY));
  }, RangeError);
});

test("expect arguments, get no arguments", t => {
  t.throws(() => {
    fns([String, Number], function() { return 0; })();
  }, RangeError);
});

test("expect no arguments, get arguments", t => {
  t.throws(() => {
    fns([], function() { return 0; })(new String(STRING));
  }, RangeError);
});

test("all match, new construction", t => {
  let r = fns([String, Number, Array], function() { return 0; })(new String(STRING), new Number(NUMBER), new Array(...ARRAY));
  t.is(r, 0);
});

test("all match, function construction", t => {
  let r = fns([String, Number, Array], function() { return 0; })(String(STRING), Number(NUMBER), Array(...ARRAY));
  t.is(r, 0);
});

test("all match, primitives", t => {
  let r = fns([String, Number, Array], function() { return 0; })(STRING, NUMBER, ARRAY);
  t.is(r, 0);
});

test("all mismatch, new construction", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(new Array(...ARRAY), new String(STRING), new Number(NUMBER));
  }, TypeError);
});

test("all mismatch, function construction", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(Array(...ARRAY), String(STRING), Number(NUMBER));
  }, TypeError);
});

test("all mismatch, primitives", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(ARRAY, STRING, NUMBER);
  }, TypeError);
});

test("some mismatch, new construction", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(new String(STRING), new Array(...ARRAY), new Number(NUMBER));
  }, TypeError);
});

test("some mismatch, function construction", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(String(STRING), Array(...ARRAY), Number(NUMBER));
  }, TypeError);
});

test("some mismatch, primitives", t => {
  t.throws(() => {
    fns([String, Number, Array], function() { return 0; })(STRING, ARRAY, NUMBER);
  }, TypeError);
});

test("string match", t => {
  let r = fns([String], function() { return 0; })(STRING);
  t.is(r, 0);
});

test("string-array mismatch", t => {
  t.throws(() => {
    fns([String], function() { return 0; })(ARRAY);
  }, TypeError);
});

test("object-object match", t => {
  let r = fns([Object], function() { return 0; })(OBJECT);
  t.is(r, 0);
});

test("object-array match", t => {
  let r = fns([Object], function() { return 0; })(ARRAY);
  t.is(r, 0);
});

test("array-object mismatch", t => {
  t.throws(() => {
    fns([Array], function() { return 0; })(OBJECT);
  }, TypeError);
});

test("base-base match", t => {
  let r = fns([Base], function() { return 0; })(new Base(NUMBER));
  t.is(r, 0);
});

test("base-derived match", t => {
  let r = fns([Base], function() { return 0; })(new Derived(NUMBER));
  t.is(r, 0);
});

test("derived-derived match", t => {
  let r = fns([Derived], function() { return 0; })(new Derived(NUMBER));
  t.is(r, 0);
});

test("derived-base mismatch", t => {
  t.throws(() => {
    fns([Derived], function() { return 0; })(new Base(NUMBER));
  }, TypeError);
});
