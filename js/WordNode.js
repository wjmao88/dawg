var WordNode = function(letter, canEnd, creator){
  this.letter = letter;
  this.canEnd = canEnd || false;
  this.children = [];
  this.parents = creator? [creator] : [];
  this.depth = creator? creator.depth : 1;
  this.id = WordNode.counter++;
};

WordNode.counter = 0;

//factory =================================================
WordNode.prototype.factory = function(letter, canEnd){
  return new WordNode(letter, canEnd, this);
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

// WordNode.prototype.removeChild = function(child){
//   this.forEachChild(function(node, index){
//     console.log(this.children, node, child);
//     if (node === child){
//       this.children.splice(index, 1);
//     }
//   });
// };

//find ====================================================
WordNode.prototype.findWord = function(word) {
  if (!word || word.length === 0 || this.letter !== word.charAt(0)){
    return false;
  }
  if (word.length === 1){
    return this.canEnd;
  } else if (this.children.length === 0){
    return false;
  } else {
    var found = false;
    var word = word.slice(1);
    this.forEachChild(function(child){
      found = found || child.findWord(word);
    });
    return found;
  }
};

//add =====================================================
WordNode.prototype.backwardMerge = function(tail) {
  console.log('====================bkwd', tail.letter);
  if (tail.parents.length === 0 ||
    tail.children.length > 1){
    return;
  }
  var found = false;
  tail.children.push(this);
  this.parents.push(tail);

  queueRender();//===========
  this.forEachParent(function(node){
    if (found || node === tail ||
      node.letter !== tail.letter ||
      node.canEnd !== tail.canEnd ||
      node.children.length !== 1){
      return;
    }
    //sever link
    this.parents.splice(this.parents.indexOf(tail));
    found = true;
    //replace, in the tail's parent, the tail with node
    var index = tail.parents[0].children.indexOf(tail);
    tail.parents[0].children.splice(index, 1);
    node.backwardMerge(tail.parents[0]);
  });

  // if (!found){
  //   tail.children.push(this);
  //   this.parents.push(tail);
  // }
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
  this.children.push(head);
  head.parents = [this];

  console.log('======================fwd', head.letter);
  queueRender();//===========

  this.forEachChild(function(node, index){
    if (found || node.letter !== head.letter || node === head){
      return;
    }
    //detach previously attached relationship
    this.children.splice(this.children.indexOf(head), 1);
    console.log(this.children);
    found = true;

    if (node === head){
      return;
    }
    if (node.parents.length > 1){
      //split off from the shared child
      //create own child to continue
      this.children[index] = this.factory(node.letter, node.canEnd);
      this.children[index].children = node.children.slice();
      this.children[index].forEachChild(function(child){
        child.parents.push(this);
      });
      node.removeParent(this);
    }
    if (head.children.length > 0){
      this.children[index].forwardMerge(head.children[0]);
    }
  });
  //if a matching node is not found
  //just put the head as a new child
  // if (!found){
  //   this.children.push(head);
  //   head.parents = [this];
  // }
};




