var roomAllocation = require('room.allocation');
var roleUpgrader = require('role.upgrader');
require("utilities.prototype.logger");

Scheduler = function() { };

Scheduler.prototype.manageSpwan = function(spwan) {

    let creepsInRoom = spwan.room.find(FIND_MY_CREEPS);

    var numberOfMiners = _.sum(creepsInRoom, (c) => (c.memory.role == 'miner'));
    var numberOfHarvesters = _.sum(creepsInRoom, (c) => (c.memory.role == 'harvester'));
    var numberOfUpgrader = _.sum(creepsInRoom, (c) => (c.memory.role == 'upgrader'));
    var numberOfBuilder = _.sum(creepsInRoom, (c) => (c.memory.role == 'builder'));
    var numberOfSoldiers = _.sum(creepsInRoom, (c) => (c.memory.role == 'soldier'));

    var sourcesNeedingMinerData = roomAllocation.sourcesNeedingMiner(spwan.room);

    if(sourcesNeedingMinerData.length > 0) {
        spwan.createMiner(sourcesNeedingMinerData[0]);

    } else {
        logger.debugLog('sourcesNeedingMiner: ' + 'None');
    }

    if(numberOfHarvesters < 2) {
        spwan.createHarvester();

    } else if(numberOfUpgrader < 2) {
        roleUpgrader.createUpgrader(spwan.name);

    } else if(numberOfBuilder < 2) {
        spwan.createBuilder();

    } else if(numberOfSoldiers < 0) {
        spwan.createSoldier();
    }

}