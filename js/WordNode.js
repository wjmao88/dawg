var WordNode = function(letter, canEnd, creator){
  this.letter = letter;
  this.canEnd = canEnd || false;
  this.children = [];
  this.parents = creator? [creator] : [];
  this.depth = creator? creator.depth : 1;
  this.id = WordNode.counter++;
};

WordNode.counter = 0;

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
  console.log('factory', letter, node.id);
  return node;
};

//add =====================================================
WordNode.prototype.backwardMerge = function(tail) {
  doRender();
  console.log('trying at ', tail.letter, this.letter, this.parents);
  if (tail.parents.length === 0 ||
    tail.children.length > 1){
    return;
  }
  var found = false;
  console.log(found);
  this.forEachParent(function(node){
    console.log('checking parent', tail.letter, node.letter);
    if (node.letter === tail.letter &&
      node.canEnd === tail.canEnd &&
      node.children.length === 1){
      found = true;
      console.log(' merging ', tail.letter, ' into ', node.letter);
      console.log(tail.parents[0].children);
      //replace, in the tail's parent, the tail with node
      var index = tail.parents[0].children.indexOf(tail);
      //tail.parents[0].children[index] = node;
      tail.parents[0].children.splice(index, 1);
      console.log(tail.parents[0].children);
      node.backwardMerge(tail.parents[0]);
    }
  });

  console.log('found?', found, tail.letter, this.letter);
  if (!found){
    console.log('new relationship', tail.letter, this.letter);
    tail.children.push(this);
    this.parents.push(tail);
  }
};

WordNode.prototype.forwardMerge = function(head) {
  doRender();
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
  console.log('fwm', this.letter, head.letter);
  var found = false;
  this.forEachChild(function(node, index){
    console.log('matching', node.letter, head.letter);
    if (found || node.letter !== head.letter){
      console.log('dont match');
      return;
    }
    console.log('match');
    found = true;
    if (node === head){
      return;
    }
    if (node.parents.length > 1){
      console.log('splitting', node.letter, 'from', this.letter, index);
      //split off from the shared child
      //create own child to continue
      var clone = this.children.slice();
      console.log(clone, index);
      this.children[index] = this.factory(node.letter, node.canEnd);
      this.children[index].children = node.children.slice();
      this.children[index].forEachChild(function(child){
        child.parents.push(this);
      });
      node.removeParent(this);
      console.log(node.parents, 'asert true 2', node.parents.indexOf(this) === -1);
    }
    if (head.children.length > 0){
      //head.children[0].parents = [this.children[index]];
      this.children[index].forwardMerge(head.children[0]);
    }
  });
  //if a matching node is not found
  //just put the head as a new child
  if (!found){
    console.log('new node', head.letter);
    this.children.push(head);
    head.parents = [this];
  }
};




