 'use strict';

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
  if (typeof arg === "string") {
    arg = arg.split(" ");
    console.log(arg);
  }
  if (Array.isArray(arg)) {
    arg = arg.toString().toLowerCase().replace(this.exceptions, " ").split(" ");
    console.log(arg);
    var searchIndex = new Set(arg);
    for (var item of searchIndex.values()) {
      for (var key in this.indexObject) {
        if (this.indexObject[key].includes(item)) {
          result.push(key);
        }
      }
    }
  } else {
    result = null;
  }
  return result;
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