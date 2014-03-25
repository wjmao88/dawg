var Spy = function(){
  this.events = {};
};

Spy.prototype.on = function(event, callback, context){
  if (!this.events[event]){
    this.events[event] = [];
  }
  this.events[event].push({
    callback: callback,
    context: context
  });
};

Spy.prototype.trigger = function(event){
  if (!this.events[event]){
    return;
  }
  this.events[event].forEach(function(response){
    response.callback.apply(response.context, [].slice.call(arguments, 1));
  });
};

Spy.prototype.spy = function(Class, funcName, event) {
  var spy = this;
  var oldFunc = Class.prototype.funcName;
  Class.prototype.funcName = function(){
    var result = oldFunc.apply(this, arguments);
    spy.trigger(event, result);
    return result;
  };
};
