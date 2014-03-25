var WordNode = function(letter, canEnd, creator){
  this.letter = letter;
  this.canEnd = canEnd || false;
  this.children = [];
  this.parents = creator? [creator] : [];
};

//utility =================================================
WordNode.prototype.toJSON = function(){
  var json = {
    letter: this.letter,
    canEnd: this.canEnd,
    children: []
  };
  this.forEachChild(function(child){
    json.children.push(child.toJSON());
  });
  return json;
};

WordNode.prototype.forEachParent = function(func){
  for (var i=0, length = this.parents.length; i<length; i++){
    func.call(this, this.parents[i], i);
  }
};

WordNode.prototype.forEachChild = function(func){
  for (var i=0, length = this.children.length; i<length; i++){
    func.call(this, this.children[i], i);
  }
};

WordNode.prototype.removeParent = function(parent){
  this.forEachParent(function(node, index){
    if (node === parent){
      this.parents.splice(index, 1);
    }
  });
};

//find ====================================================
WordNode.prototype.findWord = function(word) {
  if (!word || word.length === 0){
    return false;
  }
  if (this.letter === word.charAt(0)){
    if (word.length === 1){
      return this.canEnd;
    } else if (!this.child){
      return false;
    } else {
      return this.child.findWord(word.slice(1));
    }
  } else if (!this.sibling){
    return false;
  } else {
    return this.sibling.findWord(word.slice(1));
  }
};

//factory =================================================
WordNode.prototype.factory = function(letter, canEnd){
  var node = new WordNode(letter, canEnd, this);
  return node;
};

//add =====================================================
WordNode.prototype.backwardMerge = function(tail) {
  if (tail.parents === null){
    return;
  }
  var found = false;
  this.forEachParent(function(node){
    if (node.letter === tail.letter &&
      node.canEnd === tail.canEnd){
      found = true;
      node.backwardMerge(tail.parents[0]);
    }
  });
  if (false){
    tail.children.push(this);
    this.parents.push(tail);
  }
};

WordNode.prototype.forwardMerge = function(head) {
  //if a child node with same letter is found
  //but has different children
  //and the node has more than one parent
  //
  //then this node will replace the child node
  //with the new node
  //and the former child node will transfer all it's children
  //to the new node
  if (head.parents.length > 1){
    return;
  }
  var found = false;
  this.forEachChild(function(node, index){
    if (found || node.letter !== head.letter){
      return;
    }
    if (node === head){
      return found = true;
    }
    this.children[index] = this.factory(node.letter, node.canEnd);
    this.children[index].children = node.children;
    node.removeParent(this);
    found = true;
    if (head.children.length > 0){
      this.children[index].forwardMerge(head.children[0]);
    }
  });
  //if a matching node is not found
  //just put the head as a new child
  if (!found){
    this.children.push(head);
  }
};




