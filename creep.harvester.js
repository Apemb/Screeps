var creepHarvester = {

    prepareForTest: function () {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    },

    attributeForEnergy: function(energy) {

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
    }
};

module.exports = creepHarvester;