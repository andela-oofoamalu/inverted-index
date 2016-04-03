'use strict';

describe("Inverted index test", function() {
	var index;

	beforeEach(function() {
			index = new Index();
		});

	describe("Read book data", function() {
		it("Should read a JSON file and assert not empty", function() {
      expect(Index).toBeDefined();
      expect(index.getData).toBeDefined();

			var books = index.getData("books.json");
			expect(books).not.toBe(null);
      expect(books.length).not.toEqual(0);
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
    it("Should call getIndex method with a filePath", function() {
      spyOn(index, "getIndex");
      expect(index.getIndex).toBeDefined();

      var result = index.getIndex("books.json");
      expect(index.getIndex).toHaveBeenCalledWith("books.json");
    });

		it("Should create an index once a JSON file is read", function() {
			expect(index.indexObject).toBeDefined();

			expect(Object.keys(index.indexObject).length).toEqual(0);
			index.createIndex("books.json");
      expect(Object.keys(index.indexObject).length).not.toEqual(0);
		});

		it("Should map the string keys to the correct objects in the JSON Array", function() {
      index.createIndex("books.json");
      var listOne = index.indexObject[0];
      var listTwo = index.indexObject[1];

      expect(listOne[0]).toEqual("alice");
      expect(listOne.includes("elf")).toEqual(false);
      expect(listTwo[1]).toEqual("lord");
      expect(listTwo.includes("alice")).toEqual(false);
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
      expect(index.createIndex).toBeDefined();
      expect(index.search).toBeDefined();

      index.createIndex("books.json");
      var result1 = index.search();
      var result2 = index.search("Alice");
      var result3 = index.search("Alice rings");
      var result4 = index.search(["Lord", "wonderland", "Rabbit"]);
      var result5 = index.search(34);
      var result6 = index.search("Poker");

      expect(result1).toBe(null);
      expect(result2.length).toEqual(1);
      expect(result2).toEqual(jasmine.arrayContaining([0]));
      expect(result2).not.toEqual(jasmine.arrayContaining([1]));
      expect(result3.length).toEqual(2);
      expect(result3).toEqual(jasmine.arrayContaining([0, 1]));
      expect(result4.length).toEqual(3);
      expect(result4).toEqual(jasmine.arrayContaining([1, 0, 0]));
      expect(result5).toBe(null);
      expect(result6).not.toBe(null);
      expect(result6.length).toEqual(0);
      expect(result6).toEqual(jasmine.arrayContaining([]));
		});

    it("Should take an array of search parameters and return an array of the indices of the parameters", function() {
      expect(index.getSearchResult).toBeDefined();

      var obj = {
        '0': "Hello world!",
        '1': "This is javascript" 
      };
      var result = index.getSearchResult(["Hello", "javascript"], obj);

      expect(result.length).toEqual(2);
      expect(result).toEqual(jasmine.arrayContaining([0, 1]));
    })
	});

});