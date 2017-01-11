describe("creepAttributes", function() {
    var creepAttributes = require('../../creep.attributes');
    var specUtilities = require('../helpers/spec.utilities');

    beforeEach(function() {
        creepAttributes.prepareForTest();
        specUtilities.loadScreepsAPI();
    });

    describe("attributeForHarvesterUsingEnergy", function() {
        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [CARRY, MOVE];

            // Act
            var attributes = creepAttributes.attributeForHarvesterUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 600;
            var expectedAttributes = [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE];

            // Act
            var attributes = creepAttributes.attributeForHarvesterUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
    describe("attributeForUpgraderUsingEnergy", function() {
        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [WORK, CARRY, MOVE];

            // Act
            var attributes = creepAttributes.attributeForUpgraderUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 600;
            var expectedAttributes = [WORK,CARRY,MOVE,WORK,WORK,WORK,WORK];

            // Act
            var attributes = creepAttributes.attributeForUpgraderUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
    describe("attributeForMinerUsingEnergy", function() {
        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [WORK, CARRY, MOVE];

            // Act 
            var attributes = creepAttributes.attributeForMinerUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 500;
            var expectedAttributes = [WORK, CARRY, MOVE, WORK, WORK, WORK];

            // Act
            var attributes = creepAttributes.attributeForMinerUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
    describe("attributeForBuilderUsingEnergy", function() {
        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [WORK, CARRY, MOVE];

            // Act
            var attributes = creepAttributes.attributeForBuilderUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 600;
            var expectedAttributes = [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE];

            // Act
            var attributes = creepAttributes.attributeForBuilderUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
    describe("attributeForSoldierUsingEnergy", function() {
        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var energy = 0;
            var expectedAttributes = [ATTACK,TOUGH,MOVE,MOVE]; // 190

            // Act
            var attributes = creepAttributes.attributeForSoldierUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
        it("should return the base arguments plus a number of work if energy passed allows it", function() {
            // Arrange
            var energy = 600;
            var expectedAttributes = [ATTACK,TOUGH,MOVE,MOVE,ATTACK,TOUGH,MOVE,MOVE,ATTACK,TOUGH,MOVE,MOVE];

            // Act
            var attributes = creepAttributes.attributeForSoldierUsingEnergy(energy);

            // Assert
            expect(attributes).toEqual(expectedAttributes);
        });
    });
});
