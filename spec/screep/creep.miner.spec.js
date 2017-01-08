describe("creepMiner", function() {
    var creepMiner = require('../../creep.miner');
    var specUtilities = require('../helpers/spec.utilities');

    beforeEach(function() {
        creepMiner.prepareForTest();
        specUtilities.loadScreepsAPI();
    });
    
    describe("calculus of miner attributes depending on available energy", function() {

        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [WORK, CARRY, MOVE];
            
            // Act 
            var attributes = creepMiner.attributeForEnergy(energy);
            
            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });

        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 500;
            var expectedAttributes = [WORK, CARRY, MOVE, WORK, WORK, WORK];

            // Act
            var attributes = creepMiner.attributeForEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
});
