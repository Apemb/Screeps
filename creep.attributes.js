function AttributesData() {
    this.baseAttributes = [WORK, CARRY, MOVE];
    this.baseAttributesCost = 200;
    this.additionalAttributes = [WORK, CARRY, MOVE];
    this.additionalAttributesCost = 200;
    this.maxAdditionalAttributes = 3;

    this.attributesForEnergy = function (energy) {
        var supplementaryEnergy = energy - this.baseAttributesCost;
        var availableSupplementaryAttributes = Math.min(
            Math.trunc(supplementaryEnergy / this.additionalAttributesCost),
            this.maxAdditionalAttributes
        );

        var attributes = this.baseAttributes;

        while(availableSupplementaryAttributes > 0) {
            attributes = attributes.concat(this.additionalAttributes);
            availableSupplementaryAttributes = availableSupplementaryAttributes - 1;
        }
        return attributes;
    };
}

var creepAttributes = {

    prepareForTest: function () {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    },

    attributeForHarvesterUsingEnergy: function(energy) {
        var attributes = new AttributesData();
        
        attributes.baseAttributes = [CARRY, MOVE];
        attributes.baseAttributesCost = 100;
        attributes.additionalAttributes = [CARRY, MOVE];
        attributes.additionalAttributesCost = 100;
        attributes.maxAdditionalAttributes = 3;

        return attributes.attributesForEnergy(energy);
    },

    attributeForUpgraderUsingEnergy: function(energy) {
        var attributes = new AttributesData();

        attributes.baseAttributes = [WORK, CARRY, MOVE];
        attributes.baseAttributesCost = 200;
        attributes.additionalAttributes = [WORK];
        attributes.additionalAttributesCost = 100;
        attributes.maxAdditionalAttributes = 5;

        return attributes.attributesForEnergy(energy);
    },

    attributeForMinerUsingEnergy: function(energy) {
        var attributes = new AttributesData();

        attributes.baseAttributes = [WORK, CARRY, MOVE];
        attributes.baseAttributesCost = 200;
        attributes.additionalAttributes = [WORK];
        attributes.additionalAttributesCost = 100;
        attributes.maxAdditionalAttributes = 5;

        return attributes.attributesForEnergy(energy);
    },

    attributeForBuilderUsingEnergy: function(energy) {
        var attributes = new AttributesData();

        attributes.baseAttributes = [WORK, CARRY, MOVE];
        attributes.baseAttributesCost = 200;
        attributes.additionalAttributes = [WORK, CARRY, MOVE];
        attributes.additionalAttributesCost = 200;
        attributes.maxAdditionalAttributes = 4;

        return attributes.attributesForEnergy(energy);
    },

    attributeForSoldierUsingEnergy: function(energy) {
        var attributes = new AttributesData();

        attributes.baseAttributes = [ATTACK,TOUGH,MOVE,MOVE];
        attributes.baseAttributesCost = 190;
        attributes.additionalAttributes = [ATTACK,TOUGH,MOVE,MOVE];
        attributes.additionalAttributesCost = 190;
        attributes.maxAdditionalAttributes = 14;

        return attributes.attributesForEnergy(energy);
    },

    attributeForClaimerUsingEnergy: function(energy) {
        var attributes = new AttributesData();

        attributes.baseAttributes = [CLAIM,MOVE];
        attributes.baseAttributesCost = 650;
        attributes.additionalAttributes = [CLAIM,MOVE];
        attributes.additionalAttributesCost = 650;
        attributes.maxAdditionalAttributes = 1;

        return attributes.attributesForEnergy(energy);
    },

    attributeForPioneerUsingEnergy: function(energy) {
        var attributes = new AttributesData();

        attributes.baseAttributes = [WORK, CARRY, MOVE, MOVE];
        attributes.baseAttributesCost = 250;
        attributes.additionalAttributes = [WORK, CARRY, MOVE, MOVE];
        attributes.additionalAttributesCost = 250;
        attributes.maxAdditionalAttributes = 3;

        return attributes.attributesForEnergy(energy);
    }
};

module.exports = creepAttributes;