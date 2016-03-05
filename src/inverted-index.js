 'use strict';
// To ensure that the indexobject is not overriten when a new file is read,
// it should append the new values into the indexobject

function Index() {
  this.dataList = [];
  this.indexObject = {};
  this.exceptions = /[^a-z\s]/g;
};

Index.prototype.createIndex = function(filePath) {
  this.dataList = this.getData(filePath);
  var count = 0;
  for (var data of this.dataList) {
    this.indexObject[count] = this.parseObject(data);
    count++;
  }
};

Index.prototype.getIndex = function(filePath) {
  this.createIndex(filePath);
  return this.indexObject;
};

Index.prototype.search = function(arg) {
  var result = [];
  if (typeof arg != 'string' && !Array.isArray(arg)) {
    result = null;
  } else {
    if (typeof arg === "string") {
      arg = arg.split(" ");
    }
    arg = arg.toString().toLowerCase().replace(this.exceptions, " ").split(" ");
    result = this.getSearchResult(arg, this.indexObject);
  }
  return result;
};

Index.prototype.getSearchResult = function(searchParams, indexObject) {
  var searchResult = [];
  var searchIndex = new Set(searchParams);
  for (var item of searchIndex.values()) {
    for (var key in indexObject) {
      if (indexObject[key].includes(item)) {
        searchResult.push(parseInt(key));
      }
    }
  }
  return searchResult;
};

Index.prototype.parseObject = function(obj) {
  var wordArray = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var dataValue = obj[key];
      wordArray = wordArray.concat(dataValue.toLowerCase().replace(this.exceptions, "").split(" "));
    }
  }
  var uniqueWords = new Set(wordArray);
  return Array.from(uniqueWords);
};

Index.prototype.readFile = function(filePath, callback) {
  var request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open("GET", filePath, false);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == "200") {
      callback(request.responseText);
    }
  };
  request.send(null);
};

Index.prototype.getData = function(filePath) {
  var data;
  this.readFile(filePath, function(response) {
     data = JSON.parse(response);
  });
  return data;
};

var index = new Index();
index.createIndex("books.json");
console.log(index.search());