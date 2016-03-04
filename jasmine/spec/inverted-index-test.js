'use strict';

describe("Inverted index test", function() {
	var index;

	beforeEach(function() {
			index = new Index();
		});

	describe("Read book data", function() {
		it("Should read a JSON file and assert not empty", function() {
			var books = index.getData("books.json");

			expect(Index).toBeDefined();
			expect(index.getData).toBeDefined();
			expect(books).not.toBe(null);
			expect(books).toEqual(jasmine.any(Array));

      for (var obj of books) {
        expect(obj).toEqual(jasmine.any(Object));
        for (var key in obj) {
          expect(obj[key]).toEqual(jasmine.any(String));
        }
      }
		});
	});

	describe("Populate index", function() {
		it("Should create an index once a JSON file is read", function() {
			var indexObject = index.indexObject;
			expect(index.indexObject).toBeDefined();
			expect(Object.keys(indexObject).length).toEqual(0);

			index.createIndex("books.json");
      expect(index.createIndex).toBeDefined();
			expect(Object.keys(indexObject).length).not.toEqual(0);
		});

		it("Should map the string keys to the correct objects in the JSON Array", function() {

		});

		it("Should return an array of unique substrings in lower case", function() {
			var obj = {
				"name": "My name",
				"age": "My age"
			};
			var words = index.parseObject(obj);

			expect(index.parseObject).toBeDefined();
			expect(words.length).toEqual(3);
			expect(words[0]).toEqual("my");
      expect(words[0]).not.toEqual("My");
      expect(words[1]).toEqual("name");
      expect(words[2]).toEqual("age");
		});
	});

	describe("Search index", function() {
		it("Should return an array of the indices of the correct objects that contain the words in the search query", function() {

		});
	});

});