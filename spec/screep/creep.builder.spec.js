describe("creepBuilder", function() {
    var creepBuilder = require('../../creep.builder');
    var specUtilities = require('../helpers/spec.utilities');

    beforeEach(function() {
        creepBuilder.prepareForTest();
        specUtilities.loadScreepsAPI();
    });

    describe("calculus of harvester attributes depending on available energy", function() {

        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [WORK, CARRY, MOVE];

            // Act
            var attributes = creepBuilder.attributeForEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });

        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 600;
            var expectedAttributes = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];

            // Act
            var attributes = creepBuilder.attributeForEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
});
