var render = function(layout){
  var w = 0;
  var h = 0;
  layout.nodes.forEach(function(node){
    w = Math.max(w, node.x * 1.5 + layout.d);
    h = Math.max(h, node.y * 1.5 + layout.d);
  });

  var force = d3.layout.force()
    .charge(-120)
    .linkDistance(layout.d)
    .size([w, h])
    .nodes(layout.nodes)
    .links(layout.d3links)
    .start();

  var svg = d3.select('svg')
    .attr('width', w)
    .attr('height', h);

  //===
  var links = svg.selectAll('line')
    .data(layout.d3links);

  var nodes = svg.selectAll('circle')
    .data(layout.nodes)
    .attr('stroke-width', function(d){
      return d.canEnd? 2 : 0;
    });

  var texts = svg.selectAll('circle')
    .data(layout.nodes);
  //===
  links.exit().remove();
  nodes.exit().remove();
  //===
  links.enter().append('line')
    .attr('stroke', 'black');
  nodes.enter().append('circle')
    .attr('r', layout.r)
    .attr('stroke', 'red')
    .call(force.drag);

  texts.enter().append('text')
    .text(function(d){ return d.letter; })
    .attr('fill', 'white')
    .attr('font-size', layout.r*1.5)
    //.attr('transform', 'translate(' + (-layout.r/2) +',' + (layout.r/2) + ')');

  //
  force.on('tick', function() {
    links.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

    nodes.attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

  });
};
