/**
 *  Utils Module Tests
 */
(function() {
    "use strict";

    var chai = require("chai"),
        expect = chai.expect,
        utils = require("../lib/utils");

    suite("Utils Module", function() {
        test("should exist", function() {
            expect(utils).to.be.an("object");
        });

        suite("convertToBinary", function() {
            test("should exist", function() {
                expect(utils.convertToBinary).to.be.a("function");
            });

            suite("binary conversion", function() {
                test("should always be six characters long", function() {
                    expect(utils.convertToBinary("0").length).to.equal(6);
                });

                test("should return binary 0 for null character", function() {
                    var input = "\u0000",
                        output = "000000";

                    expect(utils.convertToBinary(input)).to.equal(output);
                });

                test("should return binary 33 for '!' character", function() {
                    var input = "!",
                        output = "100001";

                    expect(utils.convertToBinary(input)).to.equal(output);
                });

                test("should return binary 9 for tab character", function() {
                    var input = "\t",
                        output = "001001";

                    expect(utils.convertToBinary(input)).to.equal(output);
                });
            });
        });

    });

}());
