;(function (modules) {
  function _require(moduleId) {
    let module = {
      exports: {}
    }
    modules[moduleId].call(module.exports, module, exports, _require)
    return module.exports
  }
  return _require('m1')
})(
  {
    'm1': function(module, exports, _require) {
      // const m2 = require('./M2.js')
      const m2 = _require('m2')
      console.log(m2)
    },
    'm2': function(module, exports, _require) {
      module.exports = 'gp145ddd'
    }
  }
)