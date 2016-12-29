var utilities = require('utilities');

var roleUpgrader = {

    createUpgrader: function(spawnName) {
        
        var upgraderCapacities = [WORK,WORK,WORK,WORK,WORK,CARRY, MOVE, MOVE];

        var spawn = Game.spawns[spawnName];
        var controller = spawn.room.controller;

        var containers = spawn.room.find(FIND_STRUCTURES, {
            filter: (i) => (i.structureType == STRUCTURE_CONTAINER)
        });

        if(containers.length > 0) {
            var closestContainerFromController = controller.pos.findClosestByRange(containers);

            spawn.createCreep(upgraderCapacities, undefined, {
                role: 'upgrader',
                container: closestContainerFromController.id
            });
        } else {
            spawn.createCreep(upgraderCapacities, undefined, {
                role: 'upgrader'
            });
        }

    },

    /** @param {Creep} creep **/
    run: function(creep, miners) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.lastBestMinerChoice = 10;
        }

        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.memory.lastBestMinerChoice = 10;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            if(creep.memory.container) {
                var container = Game.getObjectById(creep.memory.container);
                var target = container;

            } else {
                var bestMiner = Game.getObjectById(creep.memory.bestMinerId);

                if(creep.memory.lastBestMinerChoice > 3 || bestMiner == null) {
                    creep.say('recalculating miner');
                    bestMiner = utilities.sortBestMinerForCreep(miners, creep)[0];

                    creep.memory.bestMinerId = bestMiner.id;
                    creep.memory.lastBestMinerChoice = 0;
                }

                var target = bestMiner;
            }

            if( target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            creep.memory.lastBestMinerChoice = creep.memory.lastBestMinerChoice + 1;
        }
    }
};

module.exports = roleUpgrader;
