Global = {};
Global.Test = false;
Global.Log = true;
Global.DebugLog = true;

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleSoldier = require('role.soldier');
var roleClaimer = require('role.claimer');
// var rolePioneer = require('role.claimer');
var rolePioneer = require('role.pioneer');

require("utilities.prototype.logger");
require('prototype.source');
require('prototype.spawn');
require('prototype.room');
require('prototype.tower')();
require('prototype.scheduler');

module.exports.loop = function () {

    logger.log('Tick n° ' + Game.time);

    if(Game.time % 100 == 0) {
        for (var roomName in Game.rooms) {
            var room = Game.rooms[roomName];
            room.updateSourcesCharacteristics();
            logger.log('Update Sources Characteristics for room: ' + roomName);
        }
    }

    var scheduler = new Scheduler();

    for (let spawnName in Game.spawns) {
        scheduler.manageSpwan(Game.spawns[spawnName]);
    }


    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

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
        } else if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        } else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        } else if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);
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