// For test purposes

if(typeof WORK === "undefined") {
    WORK = "work";
}
if(typeof CARRY === "undefined") {
    CARRY = "carry";
}
if(typeof MOVE === "undefined") {
    MOVE = "move";
}

var creepMiner = {

    attributeForEnergy: function(energy) {

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

        var minerAttributes = baseAttributes;

        while(availableSupplementaryAttributes > 0) {
            minerAttributes = minerAttributes.concat(additionalAttributes);
            availableSupplementaryAttributes = availableSupplementaryAttributes - 1;
        }
        return minerAttributes;
    }
};

module.exports = creepMiner;