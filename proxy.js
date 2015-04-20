/*
 * Code used from https://github.com/joyent/node/issues/4138
 */

module.exports = function(){
  var _slice  = Array.prototype.slice,
      _bind   = Function.prototype.bind,
      _apply  = Function.prototype.apply,
      _hasOwn = Object.prototype.hasOwnProperty;

  var setCB = function(){};
      
  function Forwarder(target){
    this.target = target;
  }

  Forwarder.prototype = {
    getOwnPropertyNames: function(){
      return Object.getOwnPropertyNames(this.target);
    },
    keys: function(){
      return Object.keys(this.target);
    },
    enumerate: function(){
      var i=0, keys=[];
      for (keys[i++] in this.target);
      return keys;
    },
    getPropertyDescriptor: function(key){
      var o = this.target;
      while (o) {
        var desc = Object.getOwnPropertyDescriptor(o, key);
        if (desc) {
          desc.configurable = true;
          return desc;
        }
        o = Object.getPrototypeOf(o);
      }
    },
    getOwnPropertyDescriptor: function x(key){
      var desc = Object.getOwnPropertyDescriptor(this.target, key);
      if (desc) {
        desc.configurable = true;
        return desc;
      }
      return desc;
    },
    defineProperty: function(key, desc){
      return Object.defineProperty(this.target, key, desc);
    },
    get: function get(receiver, key){
      return this.target[key];
    },
    set: function set(receiver, key, value){
      this.target[key] = value;
      setCB();
      return true;
    },
    has: function has(key){
      return key in this.target;
    },
    hasOwn: function(key){
      return _hasOwn.call(this.target, key);
    },
    delete: function(key){
      delete this.target[key];
      return true;
    },
    apply: function(receiver, args){
      return _apply.call(this.target, receiver, args);
    },
    construct: function(args){
      return new (_bind.apply(this.target, [null].concat(args)));
    }
  };

  function forward(target, set){
    var handler = new Forwarder(target);
    if (!!set) setCB = set;
    return typeof target === 'function'
      ? Proxy.createFunction(handler,
          function(){ return handler.apply(this, _slice.call(arguments)) },
          function(){ return handler.construct(_slice.call(arguments)) })
      : Proxy.create(handler, Object.getPrototypeOf(Object(target)));
  }

  return forward;
}();