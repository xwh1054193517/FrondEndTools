"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effect = effect;
// activeEffect 表示当前正在走的 effect
var acctiveEffect = null;

function effect(cb) {
  acctiveEffect = cb;
  cb();
  acctiveEffect = null;
}