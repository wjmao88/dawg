var WordGraph = function(){
  this.root = WordGraph.makeNullNode();
  this.antiRoot = WordGraph.makeNullNode();
};

WordGraph.makeNullNode = function(){
  return new WordNode(null, false, null);
};

WordGraph.prototype.find = function(word) {
  var found = false;
  this.root.forEachChild(function(child){
    found = found || child.findWord(word);
  });
  return found;
};

WordGraph.prototype.addWord = function(word){
  if (!word || !word.length || this.find(word)){
    return;
  }
  var ends = this.constructWordChain(word);
  this.root.forwardMerge(ends[0]);
  this.antiRoot.backwardMerge(ends[1]);
  var antiRoot = this.antiRoot;

  antiRoot.forEachParent(function(parent){
    if (parent.children.length > 1){
      parent.forEachChild(function(child, index){
        if (child === antiRoot){
          parent.children.splice(index, 1);
        }
      });
    }
  });

  queueRender();
};

WordGraph.prototype.constructWordChain = function(word){
  var head = this.root.factory(word.charAt(0), false);
  var node = head;
  for (var i=1; i<word.length; i++){
    node.children.push(node.factory(word.charAt(i), false));
    node = node.children[0];
  }
  node.canEnd = true;
  return [head, node];
};
