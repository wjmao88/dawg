
var WordGraphLayout = function(graph, r, d){
  this.graph = graph;
  this.calculateDepth(graph.root, 1);
  this.r = r;
  this.d = d;
};

WordGraphLayout.prototype.calculateDepth = function(node, depth){
  var context = this;
  node.depth = Math.max(node.depth || 1, depth || 1);
  node.forEachChild(function(child){
    context.calculateDepth(child, depth+1);
  });
};

WordGraphLayout.prototype.layout = function(){
  var nodes = [];
  var links = [];
  var d3links = [];
  var row = 0;
  var d = this.d;
  var renderedCache = {};

  var getNodes = function(node){
    var renderingNode = {
      letter: node.letter,
      canEnd: node.canEnd,
      children: []
    };
    renderingNode.x = node.depth * d * 2;
    renderingNode.y = (row+1) * d/3;
    row++;
    nodes.push(renderingNode);
    renderedCache[node.id] = renderingNode;

    node.forEachChild(function(child){
      renderingNode.children.push(
        renderedCache[child.id] ||
        getNodes(child));
    });

    return renderingNode;
  };

  getNodes(this.graph.root);

  nodes.forEach(function(node, index){
    node.children.forEach(function(child){
      if(child){
        links.push([node.x, node.y, child.x, child.y]);
        d3links.push({
          source: index,
          target: nodes.indexOf(child),
          value: 1
        });
      }
    });
  });

  return {
    nodes: nodes,
    links: links,
    d3links: d3links,
    r: this.r,
    d: this.d
  };
};

