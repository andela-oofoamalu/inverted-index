 'use strict';

 // Encapsulate all the code into an object named index or inverted index
 // This object should have a createIndex function that takes the file path to books.json
 // This object can be instansiated and its instance call access its functions

function Index() {
  var bookList = [];

  this.loadBooks = function(path, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", path, false);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == "200") {
        callback(request.responseText);
      }
    };
    request.send(null);
  };

  this.getBooks = function(path) {
    let books;
    loadBooks(path, function(response) {
      books = response;
    });
    return books;
  };

  this.parseObject = function(obj) {
    var text = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        text = text.concat(obj[key].toLowerCase().split(" "));
      }
    }
    return getUniqueIndex(text);
  };

  this.getUniqueIndex = function(wordArray) {
    var index = [];
    for (var val of wordArray) {
      if (index.indexOf(val) == -1 && val.length > 2) {
        index.push(val);
      }
    }
    return index;
  }

}





 // Write a function that would iterate over the bookList and extract each book instance
 // For each book instance, split the words into an array making sure that they are unique
 // this list of unique words forms an index kindaf
 // for each word, map it to its occurence in the book object
 ///How would the search work?