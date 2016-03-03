 'use strict';

function Index() {
  this.dataList = [];
  this.indexObject = {};
};

Index.prototype.createIndex = function(filePath) {
  this.dataList = this.getData(filePath);
  var count = 0;
  for (var data of dataList) {
    this.indexObject[count] = this.getUniqueIndex(this.parseObject(data));
    count++;
  }
};

Index.prototype.getIndex = function(filePath) {
  this.createIndex(filePath);
  return this.indexObject;
};

Index.prototype.search = function(arg) {

};

Index.prototype.parseObject = function(obj) {
  var array = [];
  var exceptions = /[^a-z\s]/g;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      array = array.concat(obj[key].toLowerCase().replace(exceptions, "").split(" "));
    }
  }
  return array;
};

Index.prototype.getUniqueIndex = function(array) {
  var uniqueIndex = [];
  for (var item of array) {
    if (uniqueIndex.indexOf(item) == -1 && item.length > 2) {
      uniqueIndex.push(item);
    }
  }
  return uniqueIndex;
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
     data = response;
  });
  return data;
};

var index = new Index();
var a = index.getData("books.json");
console.log(a);