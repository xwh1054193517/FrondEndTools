"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactive = reactive;
exports.effect = effect;
exports.track = track;
exports.trigger = trigger;
exports.ref = ref;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//判断是否为对象，注意null也是对象
var isObject = function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}; //判断是否存在key


var hasOwn = function hasOwn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
};

function reactive(target) {
  //reactive只适用于对象类型
  if (!isObject(target)) return target;
  var handler = {
    // 在 getter 中去递归响应式 惰性
    get: function get(target, key, receiver) {
      console.log("\u83B7\u53D6\u5BF9\u8C61\u7684".concat(key, "\u5C5E\u6027")); //在这收集依赖 

      track(target, key);
      var result = Reflect.get(target, key, receiver); //递归处理

      if (isObject(result)) {
        return reactive(result);
      }

      return result;
    },
    set: function set(target, key, value, receiver) {
      console.log("\u8BBE\u7F6E\u5BF9\u8C61\u7684".concat(key, "\u5C5E\u6027"));
      var oldValue = Reflect.get(target, key, receiver);
      var result = true;

      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver);
        trigger(target, key); //触发更新
      }

      return result;
    },
    deleteProperty: function deleteProperty(target, key) {
      console.log("\u5220\u9664\u5BF9\u8C61\u7684".concat(key, "\u5C5E\u6027")); //判断是否先有key

      var hasKey = hasOwn(target, key);
      var result = Reflect.deleteProperty(target, key);

      if (hasKey && result) {
        //更新操作
        trigger(target, key);
      }

      return result;
    }
  };
  return new Proxy(target, handler);
} // activeEffect 表示当前正在走的 effect


var activeEffect = null;

function effect(cb) {
  activeEffect = cb;
  cb();
  activeEffect = null;
} // targetMap 表里每个key都是一个普通对象 对应他们的 depsMap


var targetMap = new WeakMap();

function track(target, key) {
  //如果当前没有effect就不执行追踪
  if (!activeEffect) return; //获取当前对象的依赖关系图

  var depsMap = targetMap.get(target); //不存在就新建

  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  } //根据key从依赖图获取到effect组合


  var dep = depsMap.get(key); //不存在就新建

  if (!dep) {
    depsMap.set(key, dep = new Set());
  } //如果当前 effect不存在 ，才注册到dep里


  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
} //触发更新


function trigger(target, key) {
  var depsMap = targetMap.get(target);

  if (!depsMap) {
    return;
  }

  var dep = depsMap.get(key);

  if (dep) {
    dep.forEach(function (effect) {
      effect();
    });
  }
} //判断是否为对象 是对象就用reactive代理


var convert = function convert(val) {
  return isObject(val) ? reactive(val) : val;
};

var RefImpl =
/*#__PURE__*/
function () {
  function RefImpl(_rawValue) {
    _classCallCheck(this, RefImpl);

    this._rawValue = _rawValue;
    this.__v_isRef = true; // 判断 _rawValue 是否是一个对象
    // 如果是对象调用reactive使用 proxy来代理
    // 不是返回 _rawValue 本身

    this._value = convert(_rawValue);
  }

  _createClass(RefImpl, [{
    key: "value",
    get: function get() {
      //追踪 value
      track(this, 'value');
      return this._value;
    },
    set: function set(newValue) {
      if (newValue !== this._value) {
        this._rawValue = newValue; // 设置新值的时候也得使用 convert 处理一下，判断新值是否是对象

        this._value = convert(this._rawValue);
        trigger(this, 'value');
      }
    }
  }]);

  return RefImpl;
}();

function ref(rawValue) {
  // __v_isRef 用来标识是否是 一个 ref 如果是直接返回，不用再转
  if (isObject(rawValue) && rawValue.__v_isRef) return rawValue;
  return new RefImpl(rawValue);
}