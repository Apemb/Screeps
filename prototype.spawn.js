if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

require("./utilities.prototype.logger");

var creepMiner = require("./creep.miner");
var creepHarvester = require("./creep.harvester");
var creepBuilder = require("./creep.builder");

StructureSpawn.prototype.createMiner = function(minerData) {

    if(minerData) {
        logger.log(this.room.name + ' is needs miner with source : ' + minerData.sourceId);

        var minerAttributes = creepMiner.attributeForEnergy(this.room.energyAvailable);
        this.createCreep(minerAttributes, undefined, {
            role: 'miner',
            source: minerData.sourceId,
            container: minerData.sourceClosestContainerId
        });
    } else {
        logger.debugLog(this.room.name + ' is needs miner but data source failed');
    }
};

StructureSpawn.prototype.createHarvester = function() {

    logger.log(this.room.name + ' is needs harvester');

    var harvesterAttributes = creepHarvester.attributeForEnergy(this.room.energyAvailable);
    this.createCreep(harvesterAttributes, undefined, {
        role: 'harvester'
    });
};

StructureSpawn.prototype.createBuilder = function() {

    logger.log(this.room.name + ' is needs builder');

    var builderAttributes = creepBuilder.attributeForEnergy(this.room.energyAvailable);
    this.createCreep(builderAttributes, undefined, {
        role: 'builder'
    });
};