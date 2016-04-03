 'use strict';

/**
* This object that takes a JSON array of text objects 
* and creates an index from the array.
* The index allows a user to search for text blocks in the array 
* that contain a specified collection of words.
*
* @author Obioma Ofoamalu
* @version 0.1
*/
function Index() {
  this.dataList = [];
  this.indexObject = {};
  this.exceptions = /[^a-z\s]/g;
};

/**
 * createIndex() populates an index object 
 * based on the passed in file path
 *
 * @param {String} filePath
 */
Index.prototype.createIndex = function(filePath) {
  this.dataList = this.getData(filePath);
  var count = 0;

  for (var data of this.dataList) {
    this.indexObject[count] = this.parseObject(data);
    count++;
  }
};

/**
 * getIndex() returns an object that is an accurate index of the content of the JSON file
 * based on the passed in file path
 *
 * @param {String} filePath
 * @return {Object} this.indexObject
 */
Index.prototype.getIndex = function(filePath) {
  this.createIndex(filePath);
  return this.indexObject;
};

/**
 * searchIndex() returns an Array of numbers.
 * Each number represents the index (position) of an object in the JSON file.
 *
 * @param {String || Array} arg
 * @return {Array} result
 */
Index.prototype.searchIndex = function(arg) {
  var result = [];

  if (typeof arg != "string" && !Array.isArray(arg)) {
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

/**
 * getSearchResult() returns the search result
 * based on the passed in search parameters and index object
 *
 * @param {Array} searchParams
 * @param {Object} indexObject
 * @return {Array} searchResult
 */
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

/**
 * parseObject() returns an array of unique words
 * based on the passed in object
 *
 * @param {Object} obj
 * @return {Array} array
 */
Index.prototype.parseObject = function(obj) {
  var wordArray = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var dataValue = obj[key];
      wordArray = wordArray.concat(dataValue.toLowerCase().replace(this.exceptions, "").split(" "));
    }
  }

  return Array.from(new Set(wordArray));
};

/**
 * readFile() opens a file and read it's content
 * based on the passed in file path and callback
 *
 * @param {String} filePath
 * @param {Function} callback
 */
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

/**
 * getData() returns a JSON Array
 * based on the passed in file path
 *
 * @param {String} filePath
 * @return {Array} data
 */
Index.prototype.getData = function(filePath) {
  var data;

  this.readFile(filePath, function(response) {
     data = JSON.parse(response);
  });

  return data;
};
