if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

var roomAllocation = require("./room.allocation");

StructureSpawn.prototype.spawnCreepsIfNecessary = function() {

    let creepsInRoom = this.room.find(FIND_MY_CREEPS);

    let energy = this.room.energyCapacityAvailable;

    let levelController = this.room.controller.level;

    // let sources = this.room.find(FIND_SOURCES);
    // let numberOfSources = sources.length;

    // let storage = this.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_STORAGE)});
    // let numberOfStorage = storage.length;

    var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
    var numberOfMiners = _.sum(creepsInRoom, (c) => (c.memory.role == 'miner'));
    var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');

    var sourcesNeedingMinerData = roomAllocation.sourcesNeedingMiner(Game.spawns['Spawn1'].room);

    if(sourcesNeedingMinerData.length > 0) {
        console.log('create miner with source : ' + sourcesNeedingMinerData[0].sourceId);

        var minerAttributes = creepMiner.attributeForEnergy(Game.spawns['Spawn1'].room.energyAvailable);
        var newName = Game.spawns['Spawn1'].createCreep(minerAttributes, undefined, {
            role: 'miner',
            source: sourcesNeedingMinerData[0].sourceId,
            container: sourcesNeedingMinerData[0].sourceClosestContainerId
        });

    } else {
        console.log('sourcesNeedingMiner: ' + 'None');
    }

};