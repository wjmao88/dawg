var r = 20;
var d = 60;
var row = 1;
var col = 0;
var container = document.getElementsByTagName('svg')[0];

var createNode = function(letter, end, r, cx, cy){
  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('r', r);
  circle.setAttribute('fill', 'black');
  if (end){
    circle.setAttribute('stroke', 'grey');
    circle.setAttribute('stroke-width', '10');
  }
  var content = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  content.setAttribute('fill', 'red');
  content.setAttribute('font-size', 30);
  content.setAttribute('transform', 'translate(' + (-r/2) +',' + (r/2) + ')');
  content.innerHTML = letter? letter.toUpperCase() : '-';

  // var caption = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  // caption.setAttribute('fill', 'black');
  // caption.setAttribute('font-size', 20);
  // caption.setAttribute('transform', 'translate(' + (r/1.5) +',' + (-r) + ')');
  // caption.innerHTML = depth;

  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', 'translate('+cx+','+cy+')');
  //g.setAttribute('y', cy);
  g.appendChild(circle);
  g.appendChild(content);
  //g.appendChild(caption);
  container.appendChild(g);
};

var createLine = function(x1, y1, x2, y2){
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  path.setAttribute('x1', x1);
  path.setAttribute('y1', y1);
  path.setAttribute('x2', x2);
  path.setAttribute('y2', y2);
  path.setAttribute('stroke', 'black');
  container.appendChild(path);
};


var render = function(node, px, py, cx, cy){
  container.setAttribute('width', col*(d+5));
  container.setAttribute('height', row*(d+2));
  createNode(node.letter, node.canEnd, r, cx, cy);
  createLine(px, py, cx, cy);
  if (node.children.length > 0){
    col++;
  }
  node.children.forEach(function(child){
    render(child, cx, cy, cx+d, d*row);
    row++;
  });
};
