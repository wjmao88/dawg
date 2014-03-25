/* global Spy, WordNode, WordGraph, bindProperty */

//
// var graphSpy = new Spy();

// graphSpy.spy(WordNode, 'factory', 'newNode');
// graphSpy.on('newNode', function(node){
//   var node = document.createElement('circle');
//   node.classList.add('wordNode');
//   var line = document.createElement('path');
//   line.classList.add('arrow');

//   bindProperties(node, '')
// });


// var a = {a: 1};
// var b = {b: 1};

// bindProperty(a, 'a', b, 'b');
// console.log(a, a.a, b, b.b);

var a = {
  x: 1,
  y: 2
};

var b = {};

formulate(a, 'x', 'y', b, 'angle', 'distance', function(a, b){
  b.angle = Math.atan(a.x, a.y);
  b.distance = Math.pow(a.x*a.x + a.y*a.y, 0.5);
});

var data = {};
var div = document.createElement('div');
div.innerHTML = 'asdf';
var input = document.createElement('input');
//input.setAttribute('type', 'checkbox');
document.body.appendChild(div);
document.body.appendChild(input);

formulate(input, 'value', data, 'value', function(input, data){
  data.value = input.value;
});

formulate(data, 'value', div, 'innerHTML', function(data, div){
  console.log('bound');
  div.innerHTML = data.value;
});

input.setAttribute('value', 'fdssa');
