"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRef = toRef;
exports.toRefs = toRefs;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ObjectRefImpl =
/*#__PURE__*/
function () {
  function ObjectRefImpl(proxy, _key) {
    _classCallCheck(this, ObjectRefImpl);

    this._proxy = proxy;
    this._key = _key;
    this.__v_isRef = true;
  }

  _createClass(ObjectRefImpl, [{
    key: "value",
    get: function get() {
      // 这里不用收集依赖
      // this._proxy 就是响应式对象，
      // 当访问[this._key]时，
      // this._proxy里面会去自动收集依赖
      return this._proxy[this._key];
    },
    set: function set(newValue) {
      this._proxy[this._key] = newValue;
    }
  }]);

  return ObjectRefImpl;
}();

function toRef(proxy, key) {
  return new ObjectRefImpl(proxy, key);
} // ref是对原始数据的拷贝，
// 当修改ref数据时，模板中的视图会发生改变，
// 但是原始数据并不会改变。 
// toRef是对原始数据的引用，
// 修改toRef数据时，原始数据也会发生改变，
// 但是视图并不会更新。


function toRefs(proxy) {
  var ret = proxy instanceof Array ? new Array(proxy.length) : {};

  for (var key in proxy) {
    ret[key] = toRef(proxy, key);
  }

  return ret;
}