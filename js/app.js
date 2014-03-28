var graph = new WordGraph();

// graph.addWord('and');
// graph.addWord('at');
// graph.addWord('ant');
// graph.addWord('board');

//console.log(JSON.stringify(graph.root.toJSON(), null ,2));
var layout;

var renderQueue = new AsyncQueue(1000);

var queueRender = function(){
  var layout = new WordGraphLayout(graph, 10, 30).layout();
  renderQueue.enqueue(function(){
    render(layout);
  });
};

[
  'a',
  'able',
  'above',
  'band',
  'and',
  'sand',
  'sandbox',
  'bee',
  'see'
].forEach(function(word){
  graph.addWord(word);
});

$(function(){
  $('#resetButton').on('click', function(){
    graph = new WordGraph();
    queueRender();
  });
  $('#addButton').on('click', function(){
    var word = $('#input').val();
    graph.addWord(word);
  });
  $('#addRandom').on('click', function(){
    var numWords = window.listOfWords.length;
    var number = parseFloat($('#random').val());
    number = isNaN(number)? 1: number;
    for (var i=0; i<number; i++){
      graph.addWord(window.listOfWords[Math.random()*numWords*2 >> 1]);
    }
  });
  $('button.stepButton').on('click', function(){
    renderQueue.step();
  });

  $('button.autoMode').on('click', function(){
    renderQueue.setAuto();
  });

  $('button.stepMode').on('click', function(){
    renderQueue.setManual();
  });
  $('button.changeDelay').on('click', function(){
    var delay = $('.delay').val();
    if (isNaN(delay)){
      return;
    }
    renderQueue.delay = delay;
  });
});
//input addButton resetButton
