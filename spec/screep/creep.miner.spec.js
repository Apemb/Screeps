require('../../ScreepsAutocomplete/Global/Constants');

const WORK = "work";
const CARRY = "carry";
const MOVE = "move";

describe("creepMiner", function() {
    var creepMiner = require('../../creep.miner');

    beforeEach(function() {
    });
    
    describe("calculus of miner attributes depending on available energy", function() {

        it("return at least the base arguments", function() {
            // Arrange
            var energy = 900;
            var expectedAttributes = [WORK, CARRY, MOVE];
            
            // Act 
            var attributes = creepMiner.attributeForEnergy(energy);
            
            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
});
