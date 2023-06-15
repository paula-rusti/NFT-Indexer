const rewire = require("rewire");
const assert = require("assert");
const crawlerChild = rewire("../crawler-child");

describe("Test crawler child", async function() {
    it("should get tokens", async function() {
        // Setup, mock axios
        const axiosMock = {
            post: async function(url, data) {
                return {
                    data: {
                        processed_data: [{
                            token_id: 1,
                            name: 'token',
                            description: "test",
                        }]
                    }
                }
            }
        }
        crawlerChild.__set__("axios", axiosMock);

        // Test
        let response = await crawlerChild.getTokens("0x06012c8cf97bead5deae237070f9587f8e7a266d", [1,2,3])

        // Verify
        assert.equal(response.length, 1);
        assert.deepEqual(response, [{
            token_id: 1,
            name: 'token',
            description: "test",
        }]);
    });
});