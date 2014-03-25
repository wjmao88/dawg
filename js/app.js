var graph = new WordGraph('a', true);

// graph.addWord('and');
// graph.addWord('at');
// graph.addWord('ant');
// graph.addWord('board');

var listOfWords = window.listOfWords = ['a',
'able',
'about',
'above',
'according',
'account',
'across',
'act',
'action',
'activities',
'activity',
'actually',
'added',
'addition',
'additional',
'administration',
'after',
'again',
'against',
'age',
'ago',
'ahead',
'aid',
'air',
'all',
'almost',
'alone',
'along',
'already',
'also',
'although',
'always',
'am',
'america',
'american',
'among',
'amount',
'an',
'analysis',
'and',
'another',
'answer',
'anti',
'any',
'anyone',
'anything',
'apparently',
'appear',
'appeared',
'approach',
'are',
'area',
'areas',
'arms',
'army',
'around',
'art',
'as',
'ask',
'asked',
'association',
'at',
'attack',
'attention',
'audience',
'available',
'average',
'away'];

listOfWords.forEach(function(word){
  graph.addWord(word);
});

console.log(JSON.stringify(graph.root.toJSON(), null ,2));

render(graph.root.toJSON(), d, d, d, d);

