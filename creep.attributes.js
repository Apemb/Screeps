var creepAttributes = {

    prepareForTest: function () {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    },

    attributeForHarvesterUsingEnergy: function(energy) {

        var baseAttributes = [CARRY, MOVE];
        var baseAttributesCost = 100;

        var additionalAttributes = [CARRY, MOVE];
        var additionalAttributesCost = 100;

        var maxAdditionalAttributes = 3;

        var supplementaryEnergy = energy - baseAttributesCost;
        var availableSupplementaryAttributes = Math.min(
            Math.trunc(supplementaryEnergy / additionalAttributesCost),
            maxAdditionalAttributes
        );

        var harvesterAttributes = baseAttributes;

        while(availableSupplementaryAttributes > 0) {
            harvesterAttributes = harvesterAttributes.concat(additionalAttributes);
            availableSupplementaryAttributes = availableSupplementaryAttributes - 1;
        }
        return harvesterAttributes;
    },

    attributeForUpgraderUsingEnergy: function(energy) {

        var baseAttributes = [WORK, CARRY, MOVE];
        var baseAttributesCost = 200;

        var additionalAttributes = [WORK];
        var additionalAttributesCost = 100;

        var maxAdditionalAttributes = 5;

        var supplementaryEnergy = energy - baseAttributesCost;
        var availableSupplementaryAttributes = Math.min(
            Math.trunc(supplementaryEnergy / additionalAttributesCost),
            maxAdditionalAttributes
        );

        var upgraderAttributes = baseAttributes;

        while(availableSupplementaryAttributes > 0) {
            upgraderAttributes = upgraderAttributes.concat(additionalAttributes);
            availableSupplementaryAttributes = availableSupplementaryAttributes - 1;
        }
        return upgraderAttributes;
    }
};

module.exports = creepAttributes;