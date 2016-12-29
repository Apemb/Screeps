var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

var roomAllocation = require('room.allocation');

require('extension.source');
require('extension.room');

module.exports.loop = function () {

    console.log('Tick n° ' + Game.time);

    if(Game.time % 100 == 0) {
        for (var roomName in Game.rooms) {
            var room = Game.rooms[roomName];
            room.updateSourcesCharacteristics();
            console.log('Update Sources Characteristics for room: ' + roomName);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    var sourcesNeedingMinerData = roomAllocation.sourcesNeedingMiner(Game.spawns['Spawn1'].room);


    if(sourcesNeedingMinerData.length > 0) {
        console.log('sourcesNeedingMiner: ' + sourcesNeedingMinerData);
        console.log('create miner with source : ' + sourcesNeedingMinerData[0].sourceId);
        
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {
            role: 'miner',
            source: sourcesNeedingMinerData[0].sourceId,
            container: sourcesNeedingMinerData[0].sourceClosestContainerId
        });
        
    } else {
        console.log('sourcesNeedingMiner: ' + 'None');
    }

    if(harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester'});
    } else if(upgraders.length < 3) {
        roleUpgrader.createUpgrader('Spawn1');
    } else if(builders.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK, CARRY,CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
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

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    console.log('CPU available in bucket: ' + Game.cpu.bucket);
    console.log();
}