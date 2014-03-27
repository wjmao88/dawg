var graph = new WordGraph();

// graph.addWord('and');
// graph.addWord('at');
// graph.addWord('ant');
// graph.addWord('board');

//console.log(JSON.stringify(graph.root.toJSON(), null ,2));
var layout;
var doRender = function(){
  layout = new WordGraphLayout(graph, 10, 30);
  render(layout.layout());
};

var listOfWords = window.listOfWords = [
  'a',
  'able',
  'above',
  'bee',
  'see',
  'band',
  'and',
  'sand',
  'sandbox'
];

listOfWords.forEach(function(word){
  graph.addWord(word);
});

doRender();
console.log(layout.layout());

$(function(){
  $('#resetButton').on('click', function(){
    graph = new WordGraph();
    doRender();
  });
  $('#addButton').on('click', function(){
    var word = $('#input').val();
    graph.addWord(word);
    doRender();
  });
});
//input addButton resetButton
