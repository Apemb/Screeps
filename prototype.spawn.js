if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

require("utilities.prototype.logger");

var creepMiner = require("creep.miner");

StructureSpawn.prototype.createMiner = function(minerData) {

    if(minerData) {
        logger.log('create miner with source : ' + minerData.sourceId);

        var minerAttributes = creepMiner.attributeForEnergy(this.room.energyAvailable);
        this.createCreep(minerAttributes, undefined, {
            role: 'miner',
            source: minerData.sourceId,
            container: minerData.sourceClosestContainerId
        });
    }
};