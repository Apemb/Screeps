var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    if(miners.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK,CARRY,CARRY, MOVE], undefined, {role: 'miner'});
    } else if(harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester'});
    } else if(upgraders.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK,CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
    } else if(builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK,CARRY, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
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
}