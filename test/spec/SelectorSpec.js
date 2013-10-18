describe("The Selector Engine", function() {
    var se;
    var data;
    var simpleData;
    beforeEach(function() {
        data = [{
            "first": "John",
            "last": "Doe",
            "age": 39,
            "sex": "M",
            "salary": 70000,
            "registered": true,
            "interests": ["Reading", "Mountain Biking", "Hacking"],
            "favorites": {
                "color": "Blue",
                "sport": "Soccer",
                "food": "Spaghetti"
            },
            "skills": [{
                "category": "PHP",
                "tests": [{
                    "name": "One",
                    "score": 90
                }, {
                    "name": "Two",
                    "score": 96
                }]
            }, {
                "category": "CouchDB",
                "tests": [{
                    "name": "One",
                    "score": 32
                }, {
                    "name": "Two",
                    "score": 84
                }]
            }, {
                "category": "Node.js",
                "tests": [{
                    "name": "One",
                    "score": 97
                }, {
                    "name": "Two",
                    "score": 93
                }]
            }]
        }, {
            "first": "Max",
            "last": "Mustermann",
            "age": 35,
            "sex": "M",
            "salary": 60000,
            "registered": true,
            "interests": ["Surfing", "Walking", "Reading"],
            "favorites": {
                "color": "Red",
                "sport": "Soccer",
                "food": "Pizza"
            },
            "skills": [{
                "category": "PHP",
                "tests": [{
                    "name": "One",
                    "score": 90
                }, {
                    "name": "Two",
                    "score": 96
                }]
            }, {
                "category": "CouchDB",
                "tests": [{
                    "name": "One",
                    "score": 32
                }, {
                    "name": "Two",
                    "score": 84
                }]
            }, {
                "category": "Node.js",
                "tests": [{
                    "name": "One",
                    "score": 97
                }, {
                    "name": "Two",
                    "score": 93
                }]
            }]
        }]

        simpleDataArray = [
            {
                name: "john doe",
                age: 20,
                status: "is working",
                department: "A",
                hobby:"swimming"
            }, {
                name: "lena",
                age: 29,
                status: "is working",
                department: "C",
                hobby:"reading"
            }, {
                name: "max mustermann",
                age: 31,
                status: "is working",
                department: "D",
                hobby:""
            }
        ];

        simpleDataObject = {
            A: {
                name: "john doe",
                age: 20,
                status: "is working",
                department: "A",
                hobby:"swimming",
                friends : {
                    name: "alex",
                    age: 22
                },
                pet : {
                    name : "bello",
                    type : "dog",
                    age  : 3 
                }
            },
            B: {
                name: "lena",
                age: 29,
                status: "is working",
                department: "C",
                hobby:"reading",
                friends : [
                    {
                        name:"julia",
                        age : 30
                    }
                ]
            },
            C: {
                name: "max mustermann",
                age: 31,
                status: "is working",
                department: "D",
                hobby:""
            }
        };


        se = new SelectorEngine();

    });

    describe("should be able to find the only object in an array", function() {

        describe("containing a valid key:value pair", function() {

            it("with value of type string", function() {
                expect(se.evalSelector(simpleDataArray, "name:lena")).toEqual([simpleDataArray[1]]);
            });

            it("with value of type number", function() {
                expect(se.evalSelector(simpleDataArray, "age:31")).toEqual([simpleDataArray[2]]);
            });

        });
        describe("based on a valid key<=value2 pair", function() {

            it("where value1 of obj[key] is less or equal value2 and value2 is of type string ", function() {
                expect(se.evalSelector(simpleDataArray, "department<=B")).toEqual([simpleDataArray[0]]);
            });

            it("where value1 of obj[key] is less or equal value2 and value2 is of type number ", function() {
                expect(se.evalSelector(simpleDataArray, "age<=25")).toEqual([simpleDataArray[0]]);
            });

        });
        describe("based on a valid key>=value2 pair", function() {

            it("where value1 of obj[key] is greater than or equal value2 and value2 is of type string ", function() {
                expect(se.evalSelector(simpleDataArray, "department>=D")).toEqual([simpleDataArray[2]]);
            });

            it("where value1 of obj[key] is greater than or equal value2 and value2 is of type number ", function() {
                expect(se.evalSelector(simpleDataArray, "age>=30")).toEqual([simpleDataArray[2]]);
            });

        });

        describe("based on a valid key>value2 pair", function() {

            it("where value1 of obj[key] is greater than value2 and value2 is of type string ", function() {
                expect(se.evalSelector(simpleDataArray, "department>C")).toEqual([simpleDataArray[2]]);
            });

            it("where value1 of obj[key] is greater than value2 and value2 is of type number ", function() {
                expect(se.evalSelector(simpleDataArray, "age>30")).toEqual([simpleDataArray[2]]);
            });

        });

        describe("based on a valid key<value2 pair", function() {

            it("where value1 of obj[key] is less than value2 and value2 is of type string ", function() {
                expect(se.evalSelector(simpleDataArray, "department<B")).toEqual([simpleDataArray[0]]);
            });

            it("where value1 of obj[key] is less than value2 and value2 is of type number ", function() {
                expect(se.evalSelector(simpleDataArray, "age<24")).toEqual([simpleDataArray[0]]);
            });

        });

    });

    describe("should be able to find all objects in an array", function() {

        describe("containing a valid key:value pair", function() {

            it("with value of type string", function() {
                expect(se.evalSelector(simpleDataArray, "status:is working")).toEqual(simpleDataArray);
            });
        });

        describe("based on a valid key!=value2 pair", function() {

            it("where value1 of obj[key] is unequal value2 and value2 is of type string ", function() {
                expect(se.evalSelector(simpleDataArray, "department!=D")).toEqual([simpleDataArray[0], simpleDataArray[1]]);
            });

            it("where value1 of obj[key] is unequal value2 and value2 is of type number ", function() {
                expect(se.evalSelector(simpleDataArray, "age!=20")).toEqual([simpleDataArray[1], simpleDataArray[2]]);
            });

        });

    });

    describe("should be able to find all objects with simple nesting depth within an object", function() {

        describe("based on a valid key:value2 pair", function() {

            it("with value1 of obj[key] is equal value2 and value1 of type string", function() {
                expect(se.evalSelector(simpleDataObject, "status:is working")).toEqual([simpleDataObject.A, simpleDataObject.B, simpleDataObject.C]);
            });

        });

    });

    describe("should be able to find all objects in any nesting depth within an object", function() {

        describe("based on a valid key:value2 pair", function() {

            it("with value1 of obj[key] is less value2 and value1 of type number", function() {
                expect(se.evalSelector(simpleDataObject, "age<25")).toEqual([simpleDataObject.A, simpleDataObject.A.friends, simpleDataObject.A.pet]);
            });

        });

    });


    describe("should handle", function() {
        describe("", function() {
            it("'' (empty string) as property and return undefined", function() {
                expect(se.evalSelector(simpleDataArray, "")).toBeUndefined();
            });

            it("undefined selector as unvalid input and return undefined", function() {
                expect(se.evalSelector(simpleDataArray, undefined)).toBeUndefined();
            });

        });

        describe("single values of", function() {

            it("unvalid key as property and return undefined", function() {
                expect(se.evalSelector(simpleDataArray, "foo")).toBeUndefined();
            });

            it(": (operator only) as empty property and return []", function() {
                expect(se.evalSelector(simpleDataArray, ":")).toEqual([]);
            });

            it(" ____ (blanks only) as property and return undefined", function() {
                expect(se.evalSelector(simpleDataArray, "   ")).toBeUndefined();
            });

        })

        describe("tuple of", function() {
            it("key|: as empty value and return objects containing key:value1 and value1=''", function() {
                expect(se.evalSelector(simpleDataArray, "hobby:")).toEqual([simpleDataArray[2]]);
            });

            it("key|!= as empty value and return objects containing key:value1 and value1!=''", function() {
                expect(se.evalSelector(simpleDataArray, "hobby!=")).toEqual([simpleDataArray[0], simpleDataArray[1]]);
            });

            it("key|operator as empty value and return []", function() {
                expect(se.evalSelector(simpleDataArray, "hobby<")).toEqual([]);
            });

            it("_|: as empty property and return []", function() {
                expect(se.evalSelector(simpleDataArray, " :")).toEqual([]);
            });

        });

        describe("triple of", function() {

            it("unvalid key|operator|value as unmatched key and return []", function() {
                expect(se.evalSelector(simpleDataArray, "foo:bar")).toEqual([]);
            }); 

            it("key|unvalid operator|value triple as one bad property and return undefined", function() {
                expect(se.evalSelector(simpleDataArray, "department!!D")).toBeUndefined();
            });

            it("key|operator|unvalid value as unmatched value and return []", function() {
                expect(se.evalSelector(simpleDataArray, "age<hello")).toEqual([]);
            });

            it(" key_value (key|blank|value)", function() {
            }); 

        });

        describe("quadruple of", function() {

        });

    });

    describe("TODO", function() {



    });

});