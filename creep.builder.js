var creepBuilder = {

    prepareForTest: function () {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    },

    attributeForEnergy: function(energy) {

        var baseAttributes = [WORK, CARRY, MOVE];
        var baseAttributesCost = 200;

        var additionalAttributes = [WORK, CARRY, MOVE];
        var additionalAttributesCost = 200;

        var maxAdditionalAttributes = 4;

        var supplementaryEnergy = energy - baseAttributesCost;
        var availableSupplementaryAttributes = Math.min(
            Math.trunc(supplementaryEnergy / additionalAttributesCost),
            maxAdditionalAttributes
        );

        var builderAttributes = baseAttributes;

        while(availableSupplementaryAttributes > 0) {
            builderAttributes = builderAttributes.concat(additionalAttributes);
            availableSupplementaryAttributes = availableSupplementaryAttributes - 1;
        }
        return builderAttributes;
    }
};

module.exports = creepBuilder;