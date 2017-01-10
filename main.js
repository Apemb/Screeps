Global = {};
Global.Test = false;
Global.Log = true;
Global.DebugLog = true;

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

var roomAllocation = require('room.allocation');

require("utilities.prototype.logger");
require('prototype.source');
require('prototype.spawn');
require('prototype.room');
require('prototype.tower')();

module.exports.loop = function () {

    logger.log('Tick n° ' + Game.time);

    if(Game.time % 100 == 0) {
        for (var roomName in Game.rooms) {
            var room = Game.rooms[roomName];
            room.updateSourcesCharacteristics();
            logger.log('Update Sources Characteristics for room: ' + roomName);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    var sourcesNeedingMinerData = roomAllocation.sourcesNeedingMiner(Game.spawns['Spawn1'].room);

    if(sourcesNeedingMinerData.length > 0) {
        Game.spawns['Spawn1'].createMiner(sourcesNeedingMinerData[0]);

    } else {
        logger.debugLog('sourcesNeedingMiner: ' + 'None');
    }

    if(harvesters.length < 2) {
        Game.spawns['Spawn1'].createHarvester();

    } else if(upgraders.length < 2) {
        roleUpgrader.createUpgrader('Spawn1');

    } else if(builders.length < 2) {
        Game.spawns['Spawn1'].createBuilder();
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, miners);
        } else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, miners);
        } else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, miners);
        } else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }

    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.spendEnergy();
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    logger.debugLog('CPU available in bucket: ' + Game.cpu.bucket);
    logger.log();
}