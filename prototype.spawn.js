if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

require("./utilities.prototype.logger");
var creepAttributes = require("./creep.attributes");

StructureSpawn.prototype.createMiner = function(minerData) {

    if(minerData) {
        logger.log('Room: ' + this.room.name + ' needs miner with source : ' + minerData.sourceId);

        var minerAttributes = creepAttributes.attributeForMinerUsingEnergy(this.room.energyAvailable);
        this.createCreep(minerAttributes, undefined, {
            role: 'miner',
            source: minerData.sourceId,
            container: minerData.sourceClosestContainerId
        });
    } else {
        logger.debugLog('Room: ' + this.room.name + ' needs miner but data source failed');
    }
};

StructureSpawn.prototype.createHarvester = function() {

    logger.log('Room: ' + this.room.name + ' needs harvester');

    var harvesterAttributes = creepAttributes.attributeForHarvesterUsingEnergy(this.room.energyAvailable);
    this.createCreep(harvesterAttributes, undefined, {
        role: 'harvester'
    });
};

StructureSpawn.prototype.createBuilder = function() {

    logger.log('Room: ' + this.room.name + ' needs builder');

    var builderAttributes = creepAttributes.attributeForBuilderUsingEnergy(this.room.energyAvailable);
    this.createCreep(builderAttributes, undefined, {
        role: 'builder'
    });
};

StructureSpawn.prototype.createSoldier = function() {

    logger.log('Room: ' + this.room.name + ' needs soldier');

    var soldierAttributes = creepAttributes.attributeForSoldierUsingEnergy(this.room.energyAvailable);
    this.createCreep(soldierAttributes, undefined, {
        role: 'soldier'
    });
};

StructureSpawn.prototype.createClaimer = function() {

    logger.log('Room: ' + this.room.name + ' needs claimer');

    var claimerAttributes = creepAttributes.attributeForClaimerUsingEnergy(this.room.energyAvailable);
    this.createCreep(claimerAttributes, undefined, {
        role: 'claimer'
    });
};

StructureSpawn.prototype.createPioneer = function() {

    logger.log('Room: ' + this.room.name + ' needs pioneer');

    var claimerAttributes = creepAttributes.attributeForPioneerUsingEnergy(this.room.energyAvailable);
    this.createCreep(claimerAttributes, undefined, {
        role: 'pioneer'
    });
};