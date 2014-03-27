var WordGraph = function(){
  this.root = WordGraph.makeNullNode();
  this.antiRoot = WordGraph.makeNullNode();
};

WordGraph.makeNullNode = function(){
  return new WordNode(null, false, null);
};

WordGraph.prototype.addWord = function(word){
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
  /*
  1. keep merging from the last merge point
  check if next on the chain is mergable
  but has problem with multiple merging choices

  2. going back from the antiroot
  but when found something mergable


   */
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
