#!/usr/bin/env node

const fns = function(types, func) {
  return function(...args) {
    if (types.length !== args.length) throw RangeError(`Wrong number of arguments: expected ${types.length}, got ${args.length}.`);
    for (let i = 0, l = args.length; i < l; ++i) {
      const arg = args[i];
      let argConstrName = arg.constructor.name;
      let typeName = types[i].name;
      if (!(arg instanceof types[i]) && (argConstrName != typeName)) {
        throw new TypeError(`Type mismatch for argument ${i}: expected ${typeName}, got ${argConstrName}.`); 
      }
    }
    return func(...arguments);
  };
};

module.exports = fns;
