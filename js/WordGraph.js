var WordGraph = function(){
  this.root = WordGraph.makeNullNode();
  this.antiRoot = WordGraph.makeNullNode();
};

WordGraph.makeNullNode = function(){
  return new WordNode(null, false, null);
};

WordGraph.prototype.addWord = function(word){
  var ends = this.constructWordChain(word);
  this.antiRoot.backwardMerge(ends[1]);
  this.root.forwardMerge(ends[0]);
};

WordGraph.prototype.constructWordChain = function(word){
  var head = new WordNode(word.charAt(0));
  var node = head;
  for (var i=1; i<word.length; i++){
    node.children.push(node.factory(word.charAt(i), false));
    node = node.children[0];
  }
  node.canEnd = true;
  return [head, node];
};
