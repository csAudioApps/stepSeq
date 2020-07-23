const memoryCache = module.exports = function () {
  const cache = {};
  return {
      get:  (key) => cache[key],
      set: (key, val) => cache[key] = val,
  }
}
